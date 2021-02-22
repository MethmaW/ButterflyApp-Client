import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { SpinnerCircularSplit, SpinnerDotted } from "spinners-react";

import "./logreg.css";

//redux
import { useDispatch } from "react-redux";
import { changeView } from "../actions";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [numOne, setNumOne] = useState("");
  const [numTwo, setNumTwo] = useState("");
  const [numThree, setNumThree] = useState("");
  const [numFour, setNumFour] = useState("");
  const [numFive, setNumFive] = useState("");
  const [numSix, setNumSix] = useState("");

  //redux
  const dispatch = useDispatch();

  //backend response notifications
  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Error",
  //     description: notificationMsg,
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

  const onFinish = async (values) => {
    console.log(values);

    await axios({
      method: "POST",
      url: "http://localhost:8080/api/user/forgot-password",
      data: {
        email: email,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.error) {
          const msg = response.data.error;
          openNotificationWithIcon("error", msg);
          setTimeout(() => {
            dispatch(changeView("LOGIN"));
          }, 2000);
        }
        if (response.data.forgotStatus === "success") {
          setIsSuccess(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //submitting the passcode
  const handlePasscode = async () => {
    console.log(numOne + numTwo + numThree + numFour + numFive + numSix);

    let code = numOne + numTwo + numThree + numFour + numFive + numSix;

    await axios({
      method: "POST",
      url: "http://localhost:8080/api/user/forgot-password-passcode",
      data: {
        email: email,
        code: code,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.codeStatus === "success") {
          setShowReset(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangePass = async () => {
    if (password === confirmPassword) {
      await axios({
        method: "POST",
        url: "http://localhost:8080/api/user/reset-password",
        data: {
          email: email,
          password: password,
        },
      })
        .then(function (response) {
          console.log(response);
          handleCookie(response.data.token);
          if (response.data.token) {
            dispatch(changeView("SEARCH"));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {!isSuccess && !showReset && (
        <div className="resetFormDiv">
          <h3 className="resetTitle">
            Please enter your email address to receive the passcode and reset
            the account password
          </h3>
          <Form onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                className="logInputPass"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="resetBtn"
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {isSuccess && !showReset && (
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

      {showReset && (
        <div className="resetFormDiv">
          <h3 className="resetTitle">
            Please type a new password to reset the account password
          </h3>
          <Form>
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

            <Form.Item name="confirmPassword">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
                className="logInputPass"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  console.log(confirmPassword);
                }}
              />
              <p style={{ marginBottom: "0", color: "red" }}>
                {password !== confirmPassword ? "Passwords don't match!" : ""}
              </p>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="resetBtn"
                onClick={handleChangePass}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Reset;
