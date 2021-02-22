import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./logreg.css";
import { SpinnerCircularSplit, SpinnerDotted } from "spinners-react";
import validator from "email-validator";
import passwordValidator from "password-validator";

import Cookies from "js-cookie";

//redux
import { useDispatch } from "react-redux";
import { changeView } from "../actions";

require("dotenv").config();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [numOne, setNumOne] = useState("");
  const [numTwo, setNumTwo] = useState("");
  const [numThree, setNumThree] = useState("");
  const [numFour, setNumFour] = useState("");
  const [numFive, setNumFive] = useState("");
  const [numSix, setNumSix] = useState("");
  const [showSpinner, setShowSpinner] = useState("none");

  //redux
  const dispatch = useDispatch();

  // //backend response notifications
  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Error",
  //     description: "Email or the Password is incorrect, Please try again",
  //   });
  // };

  //response notifications
  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: "Error",
      description: msg,
    });
  };

  //Saving the cookie
  function handleCookie(token) {
    var date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000);
    Cookies.set("BD_AUTH", token, { expires: date });
  }

  //Handle login with google
  const responseGoogle = (response) => {
    console.log(response.accessToken);
    handleCookie(response.accessToken);
    dispatch(changeView("SEARCH"));
  };

  const onFinish = async (values) => {
    //validating email
    const validEmail = validator.validate(email);
    if (!validEmail) {
      const msg = "Please enter a valid email address";
      openNotificationWithIcon("error", msg);
    }

    //validating password
    var schema = new passwordValidator();

    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase(1) // Must have uppercase letters
      .has()
      .lowercase(1) // Must have lowercase letters
      .has()
      .digits(2); // Must have at least 2 digits

    const validMainPass = schema.validate(password);

    if (!validMainPass) {
      const msg = "Please enter a valid password";
      openNotificationWithIcon("error", msg);
    }

    if (validEmail && validMainPass) {
      setShowSpinner("");
      console.log(values);

      await axios({
        method: "POST",
        url: "http://localhost:8080/api/user/login",
        data: {
          email: email,
          password: password,
        },
      })
        .then(function (response) {
          setShowSpinner("none");
          console.log(response);
          if (response.data.error) {
            const msg = response.data.error;
            openNotificationWithIcon("error", msg);
            setTimeout(() => setIsSuccess(false), 2000);
          }
          if (response.data.loginStatus === "success") {
            setIsSuccess(true);
          }
        })
        .catch(function (error) {
          setShowSpinner("none");
          console.log(error);
        });
    }
  };

  //submitting the passcode
  const handlePasscode = async () => {
    setShowSpinner("");

    console.log(numOne + numTwo + numThree + numFour + numFive + numSix);

    let code = numOne + numTwo + numThree + numFour + numFive + numSix;

    await axios({
      method: "POST",
      url: "http://localhost:8080/api/user/confirm-passcode",
      data: {
        email: email,
        password: password,
        code: code,
      },
    })
      .then(function (response) {
        setShowSpinner("none");
        console.log(response);

        if (response.data.error) {
          const msg = response.data.error;
          openNotificationWithIcon("error", msg);
          setTimeout(() => setIsSuccess(false), 2000);
        }

        if (response.data.token) {
          handleCookie(response.data.token);
          dispatch(changeView("SEARCH"));
        }
      })
      .catch(function (error) {
        setShowSpinner("none");
        console.log(error);
      });
  };

  return (
    <>
      <SpinnerCircularSplit
        size={69}
        thickness={137}
        speed={98}
        color="rgba(57, 172, 104, 1)"
        secondaryColor="rgba(57, 172, 111, 0.3)"
        style={{
          position: "absolute",
          top: "4%",
          right: "4%",
          display: showSpinner,
        }}
      />
      {!isSuccess && (
        <div className="logbox">
          <h1 className="brandName">Butterfly Diary</h1>
          <p className="brandTags">Search | Identify | Contribute</p>

          <div className="loginForm">
            <GoogleLogin
              clientId={process.env.REACT_APP_GCLIENTID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="googleIn"
            />

            <div className="separator">OR</div>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="regForm"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username/Email"
                  className="logInputEmail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(email);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="logInputPass"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(password);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <a
                  className="login-form-forgot forgotLink"
                  href={false}
                  onClick={() => dispatch(changeView("RESET"))}
                >
                  Forgot password ?
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="login-form-button logBtn"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>

            <div className="separator">OR</div>
            <Button
              className="regBtn"
              block
              onClick={() => dispatch(changeView("REGISTER"))}
            >
              Register Now!
            </Button>
          </div>
        </div>
      )}

      {isSuccess && (
        <div>
          <Row>
            <Col span={12}>
              <SpinnerDotted
                size={160}
                thickness={150}
                speed={60}
                style={{ position: "absolute", top: "55%", left: "35%" }}
                color="rgba(57, 172, 104, 1)"
                secondaryColor="rgba(57, 172, 111, 0.3)"
              />
            </Col>
            <Col span={12}>
              <div>
                <h3 className="passcodeTitle">Enter Passcode</h3>
              </div>
              <div className="passcodeNumDiv">
                <input
                  type="text"
                  maxlength="1"
                  className="passcodeNum"
                  onChange={(e) => setNumOne(e.target.value)}
                />
                <input
                  type="text"
                  maxlength="1"
                  className="passcodeNum"
                  onChange={(e) => setNumTwo(e.target.value)}
                />
                <input
                  type="text"
                  maxlength="1"
                  className="passcodeNum"
                  onChange={(e) => setNumThree(e.target.value)}
                />
                <input
                  type="text"
                  maxlength="1"
                  className="passcodeNum"
                  onChange={(e) => setNumFour(e.target.value)}
                />
                <input
                  type="text"
                  maxlength="1"
                  className="passcodeNum"
                  onChange={(e) => setNumFive(e.target.value)}
                />
                <input
                  type="text"
                  maxlength="1"
                  className="passcodeNum"
                  onChange={(e) => setNumSix(e.target.value)}
                />
              </div>
              <div className="passcodeBtnDiv">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button passcodeBtn"
                  onClick={handlePasscode}
                >
                  Confirm
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button passcodeBtn"
                  onClick={onFinish}
                >
                  Resend
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Login;
