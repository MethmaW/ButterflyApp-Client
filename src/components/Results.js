import React from "react";
import { Row, Col, Card } from "antd";
import SideMenu from "./SideMenu";
import "./search.css";

//redux
import { useSelector } from "react-redux";

const Results = () => {
  // redux
  const resultsReducer = useSelector((state) => state.resultsReducer);
  const colorsReducer = useSelector((state) => state.colorsReducer);
  const sizesReducer = useSelector((state) => state.sizesReducer);

  return (
    <Row>
      <Col span={1}>
        <SideMenu />
      </Col>
      <Col offset={2} span={20} style={{ marginTop: "5%" }}>
        <h1 className="results">
          Results for {colorsReducer} color(s) and {sizesReducer} size(s) you
          selected
        </h1>
        {resultsReducer.map((card) => (
          <Row style={{ marginTop: "5%", marginBottom: "5%" }}>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: "90%" }}
                cover={<img alt="example" src={card.img} />}
              >
                <Row className="resultsDes">
                  <Col span={10}>
                    <p>Name:</p>
                    <p>Sinhala name:</p>
                    <p>Scientific Name:</p>
                    <p>Family:</p>
                  </Col>
                  <Col offset={1} span={10}>
                    <p>{card.name}</p>
                    <p>{card.sinhalaName}</p>
                    <p>{card.scientificName}</p>
                    <p>{card.family}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: "90%" }}
                className="blaa"
                cover={<img alt="example" src={card.img} />}
              >
                <Row className="resultsDes">
                  <Col span={10}>
                    <p>Name:</p>
                    <p>Sinhala name:</p>
                    <p>Scientific Name:</p>
                    <p>Family:</p>
                  </Col>
                  <Col offset={1} span={10}>
                    <p>{card.name}</p>
                    <p>{card.sinhalaName}</p>
                    <p>{card.scientificName}</p>
                    <p>{card.family}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: "90%" }}
                className="blaa"
                cover={<img alt="example" src={card.img} />}
              >
                <Row className="resultsDes">
                  <Col span={10}>
                    <p>Name:</p>
                    <p>Sinhala name:</p>
                    <p>Scientific Name:</p>
                    <p>Family:</p>
                  </Col>
                  <Col offset={1} span={10}>
                    <p>{card.name}</p>
                    <p>{card.sinhalaName}</p>
                    <p>{card.scientificName}</p>
                    <p>{card.family}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ))}

        <p className="moreInfo">
          <a href="http://www.methma.tech/" target="_blank">
            More Info...
          </a>
        </p>
      </Col>
    </Row>
  );
};

export default Results;
