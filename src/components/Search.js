import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Row, Col, notification } from "antd";
import "./search.css";
import SideMenu from "./SideMenu";

//redux
import { useDispatch } from "react-redux";
import {
  changeView,
  changeResults,
  changeColors,
  changeSizes,
} from "../actions";

const Search = () => {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [seven, setSeven] = useState(false);
  const [eight, setEight] = useState(false);
  const [nine, setNine] = useState(false);
  const [ten, setTen] = useState(false);
  const [eleven, setEleven] = useState(false);
  const [twelve, setTwelve] = useState(false);
  const [thirteen, setThirteen] = useState(false);
  const [fourteen, setFourteen] = useState(false);
  const [fifteen, setFifteen] = useState(false);
  const [small, setSmall] = useState(false);
  const [medium, setMedium] = useState(false);
  const [large, setLarge] = useState(false);
  const [toddler, setToddler] = useState(false);

  const dispatch = useDispatch();

  let authToken = "";

  try {
    authToken = Cookies.get("BD_AUTH");
  } catch (err) {
    // console.log("Cookie doesn't exist");
  }

  let colors = [];
  let sizes = [];

  one && colors.push("1");
  two && colors.push("2");
  three && colors.push("3");
  four && colors.push("4");
  five && colors.push("5");
  six && colors.push("6");
  seven && colors.push("7");
  eight && colors.push("8");
  nine && colors.push("9");
  ten && colors.push("10");
  eleven && colors.push("11");
  twelve && colors.push("12");
  thirteen && colors.push("13");
  fourteen && colors.push("14");
  fifteen && colors.push("15");

  small && sizes.push("S ");
  medium && sizes.push("M ");
  large && sizes.push("L ");
  toddler && sizes.push("T ");

  // console.log(colors);
  // console.log(sizes);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: "Notification Title",
      description: msg,
    });
  };

  const handleSearch = async () => {
    const validColors =
      colors.length !== 0 && colors.length <= 5 && colors.length >= 1;

    if (!validColors) {
      const msg = "Please select at least one color or upto five colors.";
      openNotificationWithIcon("error", msg);
    }

    const validSizes =
      sizes.length !== 0 && sizes.length <= 4 && sizes.length >= 1;

    if (!validSizes) {
      const msg = "Please select at least one size.";
      openNotificationWithIcon("error", msg);
    }

    if (validColors && validSizes) {
      await axios({
        method: "GET",
        url: "http://localhost:8080/api/results",
        headers: {
          BD_TOKEN: authToken,
        },
        data: {
          colors: colors,
          sizes: sizes,
        },
      })
        .then(function (response) {
          // console.log(response.data.results);
          dispatch(changeColors(colors.length));
          dispatch(changeSizes(sizes));
          dispatch(changeResults(response.data.results));
          dispatch(changeView("RESULTS"));
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };

  return (
    <div>
      <form>
        <Row>
          <Col span={1}>
            <SideMenu />
          </Col>
          <Col offset={2} span={8} style={{ marginTop: "10%" }}>
            <div>
              <h1 className="colorsTitle">Observed Colors</h1>
              <p className="colorSub">(Select up to 5 colors)</p>
              <div className="container">
                <ul className="ks-cboxtags">
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxOne"
                      value="Rainbow Dash"
                      onClick={() => setOne(!one)}
                    />
                    <label for="checkboxOne" className="checkboxOne"></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxTwo"
                      value="Cotton Candy"
                      onClick={() => setTwo(!two)}
                    />
                    <label for="checkboxTwo" className="checkboxTwo"></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxThree"
                      value="Rarity"
                      onClick={() => setThree(!three)}
                    />
                    <label
                      for="checkboxThree"
                      className="checkboxThree"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxFour"
                      value="Moondancer"
                      onClick={() => setFour(!four)}
                    />
                    <label for="checkboxFour" className="checkboxFour"></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxFive"
                      value="Surprise"
                      onClick={() => setFive(!five)}
                    />
                    <label for="checkboxFive" className="checkboxFive"></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxSix"
                      value="Twilight"
                      onClick={() => setSix(!six)}
                    />
                    <label for="checkboxSix" className="checkboxSix"></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxSeven"
                      value="Fluttershy"
                      onClick={() => setSeven(!seven)}
                    />
                    <label
                      for="checkboxSeven"
                      className="checkboxSeven"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxEight"
                      value="Derpy"
                      onClick={() => setEight(!eight)}
                    />
                    <label
                      for="checkboxEight"
                      className="checkboxEight"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxNine"
                      value="Princess"
                      onClick={() => setNine(!nine)}
                    />
                    <label for="checkboxNine" className="checkboxNine"></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxTen"
                      value="Gusty"
                      onClick={() => setTen(!ten)}
                    />
                    <label for="checkboxTen" className="checkboxTen"></label>
                  </li>
                  <li className="ks-selected">
                    <input
                      type="checkbox"
                      id="checkboxEleven"
                      value="Discord"
                      onClick={() => setEleven(!eleven)}
                    />
                    <label
                      for="checkboxEleven"
                      className="checkboxEleven"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxTwelve"
                      value="Clover"
                      onClick={() => setTwelve(!twelve)}
                    />
                    <label
                      for="checkboxTwelve"
                      className="checkboxTwelve"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxThirteen"
                      value="Baby"
                      onClick={() => setThirteen(!thirteen)}
                    />
                    <label
                      for="checkboxThirteen"
                      className="checkboxThirteen"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxFourteen"
                      value="Medley"
                      onClick={() => setFourteen(!fourteen)}
                    />
                    <label
                      for="checkboxFourteen"
                      className="checkboxFourteen"
                    ></label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="checkboxFifteen"
                      value="Firefly"
                      onClick={() => setFifteen(!fifteen)}
                    />
                    <label
                      for="checkboxFifteen"
                      className="checkboxFifteen"
                    ></label>
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          <Col span={12} offset={1} style={{ marginTop: "10%" }}>
            <div>
              <h1 className="colorsTitle">Size of the Butterfly</h1>
              <p className="colorSub">(Select one or more sizes)</p>
              <ul className="second">
                <li>
                  <input
                    type="checkbox"
                    id="checkboxSecondOne"
                    value=""
                    onClick={() => setSmall(!small)}
                  />
                  <label for="checkboxSecondOne" className="checkboxSize">
                    <p style={{ textAlign: "center", color: "white" }}>S</p>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkboxSecondTwo"
                    value=""
                    onClick={() => setMedium(!medium)}
                  />
                  <label for="checkboxSecondTwo" className="checkboxSize">
                    <p style={{ textAlign: "center", color: "white" }}>M</p>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkboxSecondThree"
                    value=""
                    onClick={() => setLarge(!large)}
                  />
                  <label for="checkboxSecondThree" className="checkboxSize">
                    <p style={{ textAlign: "center", color: "white" }}>L</p>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkboxSecondFour"
                    value=""
                    onClick={() => setToddler(!toddler)}
                  />
                  <label for="checkboxSecondFour" className="checkboxSize">
                    <p style={{ textAlign: "center", color: "white" }}>T</p>
                  </label>
                </li>
              </ul>
            </div>

            <button
              type="button"
              block
              className="searchBtn"
              onClick={handleSearch}
            >
              Search
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default Search;
