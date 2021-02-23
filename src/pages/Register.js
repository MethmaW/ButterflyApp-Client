import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Row, Col, notification, Upload } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { SpinnerCircularSplit, SpinnerDotted } from "spinners-react";
import validator from "email-validator";
import passwordValidator from "password-validator";
import FormData from "form-data";
import "./logreg.css";

import Cookies from "js-cookie";

//redux
import { useDispatch } from "react-redux";
import { changeView } from "../actions";

const Register = () => {
  function handleCookie(token) {
    var date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000);
    Cookies.set("BD_AUTH", token, { expires: date });
  }

  //redux
  const dispatch = useDispatch();

  //incomponenet states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [numOne, setNumOne] = useState("");
  const [numTwo, setNumTwo] = useState("");
  const [numThree, setNumThree] = useState("");
  const [numFour, setNumFour] = useState("");
  const [numFive, setNumFive] = useState("");
  const [numSix, setNumSix] = useState("");
  const [showSpinner, setShowSpinner] = useState("none");
  const [isImg, setIsImg] = useState("");

  //response notifications
  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: "Error",
      description: msg,
    });
  };

  //Upload profile picture
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const ifSuccess = () => {
    return true;
  };

  console.log(fileList);

  //submiting register inputs to get the passcode
  const onFinish = async (values) => {
    //Profile picture
    const validImg = fileList.length !== 0
    if (!validImg) {
      setIsImg("");
    } else {
      setIsImg(fileList[0].thumbUrl)
    }


    //validating username
    const validName = name.length >= 6;
    if (!validName) {
      const msg = "Username should be at least 6 charachters long";
      openNotificationWithIcon("error", msg);
    }

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
      const msg =
        "Password length should be minimum 8 charachters long and should include at least one uppercase letter, one lowercse letter and a number";
      openNotificationWithIcon("error", msg);
    }

    //validating password and confirm password
    const validPassword = password === confirmPassword;

    if (validMainPass && validPassword && validEmail && validName) {
      setShowSpinner("");

      await axios({
        method: "POST",
        url: "http://localhost:8080/api/user/register",
        data: {
          name: name,
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
          }
          if (response.data.registerStatus === "success") {
            setIsSuccess(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //  console.log(fileList[0].thumbUrl);

  //submitting the passcode
  const handlePasscode = async () => {
    setShowSpinner("");
    console.log(numOne + numTwo + numThree + numFour + numFive + numSix);

    let code = numOne + numTwo + numThree + numFour + numFive + numSix;

    // const validfileList = fileList.length !== 0;
    // if (validfileList) {
    //   setIsImg(fileList[0].thumbUrl);
    // } else {
    //   setIsImg("");
    // }

    // if (fileList.length === 0) {
    //   console.log(fileL)
    //   setIsImg("");
    // } else {
    //   console.log(fileList[0].thumbUrl);
    //   setIsImg(fileList[0].thumbUrl);
    // }

    await axios({
      method: "POST",
      url: "http://localhost:8080/api/user/confirm-email",
      data: {
        name: name,
        email: email,
        password: password,
        code: code,
        img: isImg,
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
        <div className="regbox">
          <h1 className="brandName">Butterfly Diary</h1>
          <p className="brandTags">Search | Identify | Contribute</p>

          <div className="loginForm">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="regForm"
            >
              <Form.Item>
                {/* <input
                  type="file"
                  id="imgUpload"
                  hidden
                  // onChange={uploadImg}
                  accept="image/*"
                />
                <label for="imgUpload" className="imgUpload">
                  <div className="uploadPic">
                    <p className="uploadTxt">Upload Image</p>
                  </div>
                </label> */}

                <ImgCrop rotate>
                  <Upload
                    beforeUpload={ifSuccess}
                    action="http://localhost:8080/temp/images"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length <= 0 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>

              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  className="logInputEmail"
                  onChange={(e) => {
                    setName(e.target.value);
                    console.log(name);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
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

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
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
                  className="regBtn"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
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

export default Register;
