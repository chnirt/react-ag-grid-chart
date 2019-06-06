import React from "react";
import { Form, Row, Col, Input, Button, Icon, Typography } from "antd";
import { AgGridReact } from "ag-grid-react";
import { data } from "./db";

const { Text } = Typography;

class AdvancedSearchForm extends React.Component {
  state = {
    expand: true,
    height: 0
  };

  // To generate mock Form.Item
  getFields() {
    const fields = Object.keys(data[0]);
    const count = this.state.expand ? fields.length : 0;
    const { getFieldDecorator } = this.props.form;
    const children = [];

    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
          xl={{ span: 3 }}
          key={i}
          style={{ display: i < count ? "block" : "none" }}
        >
          <Text type="secondary">{fields[i].toUpperCase()}</Text>
          <Form.Item>
            {getFieldDecorator(fields[i], {
              rules: [
                {
                  required: true,
                  message: fields[i] + " is not empty!"
                }
              ]
            })(<Input placeholder={"Placeholder " + fields[i]} />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    if (expand) {
      this.setState({ height: 0 });
    } else {
      this.setState({ height: 85 });
    }
    this.setState({ expand: !expand });
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
    var chartRangeParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ["name", "point"]
      },
      chartType: "groupedBar",
      chartContainer: document.querySelector("#myChart"),
      aggregate: true
    };
    params.api.chartRange(chartRangeParams);
  }

  render() {
    // console.log(data);
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row>
          <Col span={24} style={{ textAlign: "right", marginBottom: 12 }}>
            <span
              style={{ fontSize: 14, cursor: "pointer" }}
              onClick={this.toggle}
            >
              {this.state.expand ? "Hide " : "Show "}
              <Icon type={this.state.expand ? "up" : "down"} />
            </span>
            <span
              style={{ marginLeft: 20, fontSize: 14, cursor: "pointer" }}
              onClick={this.handleReset}
            >
              Clear
            </span>
            <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit">
              Apply
            </Button>
          </Col>
        </Row>
        <Row gutter={24}>{this.getFields()}</Row>
        <div
          style={{
            width: "100%",
            height: `calc(100vh - 94px - ${this.state.height}px)`
          }}
        >
          <div className="wrapper">
            <div
              id="myGrid"
              className="ag-theme-balham my-grid"
              style={{
                width: "100%"
                // height: "30vh"
              }}
            >
              <AgGridReact
                columnDefs={[
                  {
                    // headerName: "Name",
                    field: "name",
                    chartType: "category"
                  },
                  {
                    // headerName: "Phone",
                    field: "phone"
                  },
                  {
                    // headerName: "Address",
                    field: "address"
                  },
                  {
                    // headerName: "Age",
                    field: "age",
                    enableRowGroup: true,
                    sort: "asc"
                  },
                  {
                    // headerName: "Gender",
                    field: "gender"
                  },
                  {
                    // headerName: "Job",
                    field: "job"
                  },
                  {
                    // headerName: "Job",
                    field: "point",
                    enableValue: true
                  },
                  {
                    // headerName: "Job",
                    field: "dayoff",
                    chartType: "excluded"
                  }
                ]}
                // defaultColDef={{
                //   resizable: true
                // }}
                popupParent={document.body}
                enableRangeSelection={true}
                enableCharts={true}
                processChartOptions={function(params) {
                  var opt = params.options;
                  opt.title = { text: `Medals by Name` };
                  opt.legendPosition = "bottom";
                  if (params.type === "groupedBar") {
                    opt.xAxis.labelRotation = 0;
                  }
                  opt.seriesDefaults.tooltipRenderer = function(params) {
                    var value = params.datum[params.yField];
                    return `<b>${params.yField}</b>: ${value}`;
                  };
                  return opt;
                }}
                onGridRead={this.onGridReady.bind(this)}
                onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                rowData={data}
              />
            </div>
            <div
              style={{
                width: "100%"
                // height: "30vh"
              }}
              id="myChart"
              className="ag-theme-balham my-grid"
            />
          </div>
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "advanced_search" })(AdvancedSearchForm);
