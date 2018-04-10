import React from "react";
import FontIcon from "material-ui/FontIcon";

export const generateUUID = () => {
  var d = new Date().getTime();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
};

export const getFullScreenDialogStyle = () => {
  let innerHeightContainer;
  const dialogHeader = 76;
  const dialogFooter = 52;
  const wastedSpace = dialogHeader + dialogFooter - 3;
  innerHeightContainer = global.window.innerHeight || window.innerHeight;

  const customContentStyle = {
    width: "100%",
    maxWidth: "none",
    top: -dialogHeader - 4 + "px"
    // maxHeight: '701px',
    // minHeight: '701px'
  };

  const bodyStyle = {
    minHeight: innerHeightContainer - wastedSpace + "px"
  };

  return {
    customContentStyle: customContentStyle,
    bodyStyle: bodyStyle
  };
};

export const dashboardDefaultState = {
  name: "",
  description: "",
  layouts: []
};

export const dashboardColumns = [
  {
    data: "name",
    title: "Name"
  },
  {
    data: "description",
    title: "Description"
  },
  {
    data: "dateUpdated",
    title: "Date Modified"
  },
  {
    data: "dateCreated",
    title: "Date Created"
  }
];

export const tileDefaultState = {
  name: "",
  description: "",
  dynamicFilter: false,
  enable: false,
  tileType: "",
  refreshRate: "0"
};

import TextIco from "material-ui/svg-icons/editor/text-fields";
import ImageIco from "material-ui/svg-icons/image/photo";
import ChartIco from "material-ui/svg-icons/editor/insert-chart";
import PieChartIco from "material-ui/svg-icons/editor/pie-chart";
import LineChartIco from "material-ui/svg-icons/editor/show-chart";

import TableIco from "material-ui/svg-icons/action/view-column";
import DynamicListIco from "material-ui/svg-icons/action/list";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/fontawesome-free-solid";
//chart-area

export const tileType = [
  {
    renderAs: (
      <MenuItem leftIcon={<DynamicListIco />} primaryText="Dynamic List" />
    ),
    value: "dynamicList",
    text: "Dynamic List",
    info: "Data in table format"
  },
  {
    renderAs: <MenuItem leftIcon={<TableIco />} primaryText="Table" />,
    value: "table",
    text: "Table",
    info: ""
  },
  {
    value: "text",
    renderAs: <MenuItem leftIcon={<TextIco />} primaryText="Text" />,
    text: "Text",
    info: "Static or Dynamic"
  },
  {
    value: "image",
    renderAs: <MenuItem leftIcon={<ImageIco />} primaryText="Image" />,
    text: "Image",
    info: ""
  },
  {
    value: "chart",
    renderAs: <MenuItem leftIcon={<ChartIco />} primaryText="Chart" />,
    text: "Chart",
    info: "Static or Dynamic"
  },
  {
    value: "pie",
    renderAs: <MenuItem leftIcon={<PieChartIco />} primaryText="Pie Chart" />,
    text: "Pie Chart",
    info: ""
  },
  {
    renderAs: "external",
    value: "external",
    text: "External",
    info: ""
  },
  {
    renderAs: "wallboards",
    value: "wallboards",
    text: "Wallboards",
    info: "Combination of Tiles"
  },
  {
    renderAs: "actionType",
    value: "actionType",
    text: "Action type",
    info: "Add action buttons"
  },
  {
    renderAs: "tileSet",
    value: "tileSet",
    text: "Tile set",
    info: "Tile set"
  }
];

export const chartvalues = [
  {
    UID: "dynamicList",
    name: "Dynamic List",
    icon: () => {
      return <DynamicListIco />;
    }
  },
  {
    UID: "image",
    name: "Image",
    icon: () => {
      return <ImageIco />;
    }
  },

  {
    UID: "table",
    name: "Table",
    icon: () => {
      return <FontAwesomeIcon icon="table" />;
    }
  },
  {
    UID: "text",
    name: "Text",
    icon: () => {
      return <FontAwesomeIcon icon="font" />;
    }
  },
  {
    UID: "area",
    name: "Area",
    icon: () => {
      return <FontAwesomeIcon icon="chart-area" />;
    },
    useHighChart: true,
    child: []
  },
  {
    UID: "bar",
    name: "Bar",
    useHighChart: true,
    icon: () => {
      return <ChartIco />;
    },
    child: []
  },
  {
    UID: "line",
    name: "Line",
    icon: () => {
      return <LineChartIco />;
    },
    useHighChart: true,
    child: []
  },
  {
    UID: "pie",
    name: "Pie",
    icon: () => {
      return <FontAwesomeIcon icon="chart-pie" />;
    },
    useHighChart: true,
    child: []
  },
  {
    UID: "column",
    name: "Column",
    icon: () => {
      return <TableIco />;
    },
    useHighChart: true,
    child: []
  }
];

export const RealTimeFeeds = {
  responses: [
    {
      UID: "33dfe915-184f-4fff-8dc6-703cfca00c7b",
      name: "LiveAgentStatus",
      Columns: [
        {
          Name: "recordId",
          ColumnIndex: 0,
          DataType: "String"
        },
        {
          Name: "agentId",
          ColumnIndex: 2,
          DataType: "String"
        },
        {
          Name: "agentName",
          ColumnIndex: 3,
          DataType: "String"
        },
        {
          Name: "agentState",
          ColumnIndex: 11,
          DataType: "String"
        }
      ],
      Rows: [
        {
          action: 0,
          Data: ["PK_1_6667_32056", "6667", "work", "NotLoggedIn"],
          PrimaryKey: "PK_1_6667_32056"
        },
        {
          action: 0,
          Data: ["PK_1_98888_32056", "98888", "agt Z o'joyce", "Waiting"],
          PrimaryKey: "PK_1_98888_32056"
        },
        {
          action: 0,
          Data: ["PK_1_6668_32056", "6668", "Zandor O'Joyce MN", "NotLoggedIn"],
          PrimaryKey: "PK_1_6668_32056"
        }
      ]
    },
    {
      UID: "d86c994e-da77-4117-98fe-1416e851ac2b",
      name: "InboundLiveStatus",
      Columns: [
        {
          Name: "queueId",
          ColumnIndex: 2,
          DataType: "Int32"
        },
        {
          Name: "queueName",
          ColumnIndex: 3,
          DataType: "String"
        },
        {
          Name: "currentTotalAgentReadyCount",
          ColumnIndex: 13,
          DataType: "Int32"
        },
        {
          Name: "currentTotalAgentNotReadyCount",
          ColumnIndex: 14,
          DataType: "Int32"
        },
        {
          Name: "currentTotalAgentTalkingCount",
          ColumnIndex: 15,
          DataType: "Int32"
        }
      ],
      Rows: [
        {
          action: 0,
          Data: [49, "Q5555ss", 1, 0, 0],
          PrimaryKey: "PK_1_49"
        }
      ]
    },
    {
      UID: "e03be18b-9ea8-493d-9e16-ee5d3358a4bd8",
      name: "InboundLiveStatus",
      Columns: [
        {
          Name: "recordId",
          ColumnIndex: 0,
          DataType: "String"
        },
        {
          Name: "timeBucketId",
          ColumnIndex: 1,
          DataType: "Int32"
        },
        {
          Name: "queueId",
          ColumnIndex: 2,
          DataType: "Int32"
        },
        {
          Name: "queueName",
          ColumnIndex: 3,
          DataType: "String"
        },
        {
          Name: "rowUpdateTime",
          ColumnIndex: 4,
          DataType: "DateTime"
        },
        {
          Name: "currentLongestWaitingTime",
          ColumnIndex: 5,
          DataType: "Int32"
        }
      ],
      Rows: [
        {
          action: 0,
          Data: [
            "PK_7_144",
            9,
            124,
            "Noor_wooz",
            "2018-03-13T23:22:18.7737043Z",
            367
          ],
          PrimaryKey: "PK_7_144"
        },
        {
          action: 0,
          Data: [
            "PK_7_144",
            7,
            144,
            "Guv1_Default",
            "2018-03-07T12:22:18.7737043Z",
            367
          ],
          PrimaryKey: "PK_7_144"
        },
        {
          action: 0,
          Data: [
            "PK_8_144",
            8,
            144,
            "Guv1_Default",
            "2018-03-07T12:22:18.7737043Z",
            367
          ],
          PrimaryKey: "PK_8_144"
        },
        {
          action: 0,
          Data: [
            "PK_9_144",
            9,
            144,
            "Guv1_Default",
            "2018-03-07T12:22:18.7737043Z",
            367
          ],
          PrimaryKey: "PK_9_144"
        },
        {
          action: 0,
          Data: [
            "PK_0_144",
            0,
            144,
            "Guv1_Default",
            "2018-03-07T12:22:18.7737043Z",
            367
          ],
          PrimaryKey: "PK_0_144"
        },
        {
          action: 0,
          Data: [
            "PK_1_144",
            1,
            144,
            "Guv1_Default",
            "2018-03-07T12:22:18.7737043Z",
            367
          ],
          PrimaryKey: "PK_1_144"
        },
        {
          action: 0,
          Data: [
            "PK_7_154",
            7,
            154,
            "Guv2_Default",
            "2018-03-07T00:00:36.6394399Z",
            0
          ],
          PrimaryKey: "PK_7_154"
        }
      ],
      filter: {}
    },
    {
      UID: "8a9b0991-f512-4701-8ff7-78673625ba03",
      name: "ContactSessionState",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [
            "81a3087e-c93b-4b08-eb2a-d70c29352149",
            "Queuing",
            0,
            145,
            "Darshak_Default",
            0,
            0,
            "2902710-3726398832-867731@qanextone.magneticnorth.com",
            0,
            0,
            "2018-01-31T15:03:40.662Z",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "+441162292747",
            ""
          ],
          PrimaryKey: "81a3087e-c93b-4b08-eb2a-d70c29352149"
        }
      ]
    },
    {
      UID: "cd956b31-2cb6-4834-9366-04a8c179b881",
      name: "InboundLiveStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [145, "Darshak_Default", 1, 0, 0, 1, 0, 0, 0],
          PrimaryKey: "PK_1_145"
        }
      ]
    },
    {
      UID: "a426238e-48d0-4276-b19c-b8b88acba7b3",
      name: "ContactSessionState",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [
            "7023fe0a-81cc-4576-a623-393caa23ae11",
            "Queuing",
            0,
            145,
            "Darshak_Default",
            0,
            0,
            "2907197-3726400727-760662@qanextone.magneticnorth.com",
            0,
            0,
            "2018-01-31T15:35:15.525Z",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "+441162292747",
            ""
          ],
          PrimaryKey: "7023fe0a-81cc-4576-a623-393caa23ae11"
        }
      ]
    },
    {
      UID: "fbf36087-d674-4c36-98a1-de4fe047d442",
      name: "InboundLiveStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [145, "Darshak_Default", 1, 0, 1, 0, 0, 0, 0],
          PrimaryKey: "PK_1_145"
        }
      ]
    },
    {
      UID: "d00b62f9-8f08-4aa7-a868-51f9f32f997d",
      name: "InboundLiveStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [145, "Darshak_Default", 0, 0, 0, 0, 1, 0, 0],
          PrimaryKey: "PK_1_145"
        }
      ]
    },
    {
      UID: "31a1a4bb-0e05-4f52-9231-5e2b1542096a",
      name: "LiveAgentStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: ["PK_1_217641_32109", "217641", "Darsh Lakh", "Talking"],
          PrimaryKey: "PK_1_217641_32109"
        }
      ]
    },
    {
      UID: "3c2c9a40-a785-43ed-8f88-7ee693e03d17",
      name: "ContactSessionState",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [
            "7023fe0a-81cc-4576-a623-393caa23ae11",
            "ConnectedToAgent",
            0,
            145,
            "Darshak_Default",
            217641,
            0,
            "2907197-3726400727-760662@qanextone.magneticnorth.com",
            0,
            0,
            "2018-01-31T15:35:15.525Z",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "2018-01-31T15:35:15.665Z",
            "0001-01-01T00:00:00",
            "+441162292747",
            ""
          ],
          PrimaryKey: "7023fe0a-81cc-4576-a623-393caa23ae11"
        }
      ]
    },
    {
      UID: "79b5fbf5-3810-45da-80b9-3ffe82081a11",
      name: "ContactSessionState",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [
            "7023fe0a-81cc-4576-a623-393caa23ae11",
            "Disconnected",
            0,
            145,
            "Darshak_Default",
            217641,
            0,
            "2907197-3726400727-760662@qanextone.magneticnorth.com",
            0,
            5,
            "2018-01-31T15:35:15.525Z",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "2018-01-31T15:35:15.665Z",
            "2018-01-31T15:35:51.876Z",
            "+441162292747",
            ""
          ],
          PrimaryKey: "7023fe0a-81cc-4576-a623-393caa23ae11"
        }
      ]
    },
    {
      UID: "d974e1b6-06fe-4c40-8ac0-42d8df771f05",
      name: "InboundLiveStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [145, "Darshak_Default", 0, 0, 0, 0, 0, 1, 0],
          PrimaryKey: "PK_1_145"
        }
      ]
    },
    {
      UID: "ca681b71-c191-418f-b1f4-e3a113acdcb8",
      name: "LiveAgentStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: ["PK_1_217641_32109", "217641", "Darsh Lakh", "Wrapping"],
          PrimaryKey: "PK_1_217641_32109"
        }
      ]
    },
    {
      UID: "f7ee139d-295f-4c10-8c90-8418acf64466",
      name: "ContactSessionState",
      Columns: null,
      Rows: [
        {
          action: 2,
          Data: [
            "7023fe0a-81cc-4576-a623-393caa23ae11",
            "Completed",
            0,
            145,
            "Darshak_Default",
            217641,
            0,
            "2907197-3726400727-760662@qanextone.magneticnorth.com",
            0,
            5,
            "2018-01-31T15:35:15.525Z",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "2018-01-31T15:35:15.665Z",
            "2018-01-31T15:35:51.876Z",
            "+441162292747",
            ""
          ],
          PrimaryKey: "7023fe0a-81cc-4576-a623-393caa23ae11"
        }
      ]
    },
    {
      UID: "2d2a849c-aff5-4959-bad6-0ed374ea8ac3",
      name: "InboundLiveStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [145, "Darshak_Default", 0, 0, 1, 0, 0, 0, 0],
          PrimaryKey: "PK_1_145"
        }
      ]
    },
    {
      UID: "eaadc717-ff32-411b-a57e-3851c5231884",
      name: "LiveAgentStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: ["PK_1_217641_32109", "217641", "Darsh Lakh", "Waiting"],
          PrimaryKey: "PK_1_217641_32109"
        }
      ]
    },
    {
      UID: "952d3e89-3356-43eb-afb1-74a3f27689b1",
      name: "ContactSessionState",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [
            "f77e448e-acf1-4c6d-fe7f-6c6e711acd54",
            "Queuing",
            0,
            145,
            "Darshak_Default",
            0,
            0,
            "2905530-3726400023-375439@qanextone.magneticnorth.com",
            0,
            0,
            "2018-01-31T15:23:31.245Z",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "0001-01-01T00:00:00",
            "+441162292747",
            ""
          ],
          PrimaryKey: "f77e448e-acf1-4c6d-fe7f-6c6e711acd54"
        }
      ]
    },
    {
      UID: "be1649ca-fe94-4d7c-a7c9-64a357972ffc",
      name: "InboundLiveStatus",
      Columns: null,
      Rows: [
        {
          action: 0,
          Data: [145, "Darshak_Default", 1, 0, 0, 1, 0, 0, 0],
          PrimaryKey: "PK_1_145"
        }
      ]
    }
  ]
};

export const tileData = [
  {
    UID: "78ef6859-a43e-4870-dbc9-dcef9ed762ce",
    name: "Inbounds",
    description: "Inbounds Live Status",
    enable: true,
    refreshRate: "4",
    header: {
      title: "Agent status dashboard",
      class: "CLASS REQUIRED"
    },
    footer: {},

    type: {
      chart: {
        type: "table"
      },
      table: {
        style: "",
        id: "inboundTable",
        className: "",
        searchable: true,
        paging: 10,
        hscrollbar: false,
        vscrollbar: true,
        sort: [
          {
            datasource: {
              columnName: "queueId"
            },
            sort: "none"
          },
          {
            datasource: {
              columnName: "queueName"
            },
            sort: "asc"
          },
          {
            datasource: {
              columnName: "timeBucketId"
            },
            sort: "desc"
          }
        ],
        columns: [
          {
            style: "",
            sortable: true,
            title: "Queue Name",
            datasource: {
              columnName: "queueName"
            }
          },
          {
            style: "",
            title: "",
            width: "100",
            widthUnit: "%",
            horizontalAlign: "center",
            sortable: false,
            visible: true,
            title: "Queue ID",
            datasource: {
              columnName: "queueId"
            }
          }
          // {
          //   style: "",
          //   title: "",
          //   horizontalAlign: "center",
          //   width: "100",
          //   widthUnit: "%",
          //   sortable: false,
          //   visible: true,
          //   datasource: {
          //     columnName: ""
          //   }
          // }
        ]
      }
    },

    "common JS script-css files": [
      {
        url: "",
        type: ""
      }
    ],
    dataUpdateFunction: {
      name: "updateTable",
      code:
        "  for (var j = 0; j < data.length; j++) {$(document.getElementById(objId)).dataTable().fnAddData(data[j], false);}$(document.getElementById(objId)).dataTable().fnDraw();"
    },
    exceptionfunction: {
      name: "",
      code: ""
    },
    cleardatafunction: {
      name: "",
      code: ""
    },
    customfunctions: [
      {
        name: "UpdateTimeInState",
        code:
          "$(document.getElementById(objId)).dataTable().fnAddData(data[0], false); $(document.getElementById(objId)).dataTable().fnDraw(); setTimeout(UpdateTimeInState, 1000);",
        initCall: false,
        addToCounter: false
      }
    ],
    dataSet: RealTimeFeeds.responses[2],
    dynamicFilter: false,

    editStatus: "NoChange",

    dateCreated: "Fri Dec 08 2017",
    dateUpdated: "Fri Dec 10 2017",

    connection: "Connection"
  },
  {
    UID: "c9d52832-82e3-4f54-8998-dccf1b20a5ef",
    name: "Agent State",
    description: "Displays status used for campaign",
    enable: true,
    style: {
      GUID: [
        "4a708b0f-1c50-47aa-a7f9-1a1c20950e74",
        "5d5d9137-e953-4dd7-a0b2-67d25ecd6c60"
      ]
    },
    dataSet: RealTimeFeeds.responses[0],

    type: {
      chart: {
        type: "pie"
      },
      title: {
        text: "Agent States Filter campaign, ID: 32191"
      },
      subtitle: {
        text: "Displays status used for campaign"
      },
      credits: {
        text: "Example.com",
        href: "",
        style: {
          color: "#999999",
          cursor: "pointer",
          fontSize: "9px"
        },
        position: {
          align: "left", // right
          x: 15
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.y:.1f}%"
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      series: [
        {
          name: "Brands",

          colorByPoint: true,
          data: [
            {
              name: "Not Ready",
              y: 56.33,
              color: "#0066FF"
            },
            {
              name: "Previewing",
              y: 24.03,
              color: "rgb(253, 235, 51)"
            },
            {
              name: "Talking",
              y: 10.38
            },
            {
              name: "Wrap",
              y: 4.77
            },
            {
              name: "Waiting",
              y: 0.91
            },
            {
              name: "Undetectable",
              y: 0.2
            }
          ]
        }
      ]
    },
    dynamicFilter: false,
    editStatus: "NoChange",
    header: "header",
    footer: "footer",
    dateCreated: "Fri Dec 08 2017",
    dateUpdated: "Fri Dec 10 2017",
    connection: "Connection",
    refreshRate: "0.2"
  },

  {
    UID: "524083fe-22e8-4def-f8ab-97b5f9f03052",
    name: "LiveAgentStatus",
    description: "Live Agent Status",

    enable: true,
    tileType: "Text",
    dynamicFilter: false,

    editStatus: "NoChange",
    header: "header",
    footer: "footer",
    dateCreated: "Fri Dec 08 2016",
    dateUpdated: "Fri Dec 10 2017",
    dataSet: RealTimeFeeds.responses[2],
    connection: "Connection",
    refreshRate: "0"
  },

  {
    UID: "2a3872e9-1798-40ad-d2b2-1a8014a744c2",
    name: "InboundLiveStatus",
    description: "Inbound Live Status",

    enable: false,
    tileType: "Dynamic List",
    dynamicFilter: false,

    editStatus: "NoChange",
    header: "header",
    footer: "footer",
    dateCreated: "Mon Jan 10 2016",
    dateUpdated: "Fri Dec 10 2017",
    dataSet: RealTimeFeeds.responses[2],
    connection: "Connection",
    refreshRate: "1"
  },

  {
    UID: "1e273d11-1364-4500-d173-7bd819c9fdd7",
    name: "Waiting Time",
    description: "Average Waiting Time",

    enable: true,
    tileType: "Image",
    dynamicFilter: false,
    editStatus: "NoChange",
    header: "header",
    footer: "footer",
    dateCreated: "Fri Dec 08 2017",
    dateUpdated: "Fri Dec 10 2017",
    dataSet: RealTimeFeeds.responses[2],
    connection: "Connection",
    refreshRate: "2"
  },

  {
    UID: "c5d8928d-d9cc-44c3-fbf4-176005ba0080",
    name: "Calls in Queue",
    description: "Calls in Queue",

    enable: true,
    tileType: "Wallboards",
    dynamicFilter: false,

    editStatus: "NoChange",
    header: "Calls in Queue",
    footer: "foot",
    dateCreated: "Fri Dec 08 2017",
    dateUpdated: "Fri Dec 10 2017",
    dataSet: RealTimeFeeds.responses[2],
    connection: "Connection",
    refreshRate: "0.2"
  },
  {
    UID: "8fc04396-3904-4341-e6cf-7d02cd5fa4c5",
    name: "Longest in Queue",
    description: "zzz to display sales",

    enable: true,
    tileType: "External",
    dynamicFilter: false,

    editStatus: "NoChange",
    header: "Longest in Queue",
    footer: "footer",
    dateCreated: "Fri Dec 08 2017",
    dateUpdated: "Fri Dec 10 2017",
    dataSet: RealTimeFeeds.responses[2],
    connection: "Connection",
    refreshRate: "3"
  },
  {
    UID: "7f486d80-1e7a-4a96-9c11-f8223fa7ea47",
    name: "Calls Received",
    description: "zzz to display sales",

    enable: true,
    tileType: "ActionType",
    dynamicFilter: false,

    editStatus: "NoChange",
    header: "Calls Received",
    footer: "footer",
    dateCreated: "Fri Dec 08 2017",
    dateUpdated: "Fri Dec 10 2017",
    dataSet: RealTimeFeeds.responses[2],
    connection: "Connection", // to remove
    refreshRate: "4"
  }
];

export const displaySets = [
  {
    UID: "469d5275-0132-4fe1-9419-b5ec03b44a0c",
    name: "Sales",
    description: "Sales Targets",
    //an array of "displaySet"
    displaySet: [
      "8fe81838-0fb0-4243-a285-d6adea59b6c5",
      "f0396d43-beb4-4749-acaa-0e3e4363bd4d",
      "4f5903a5-e4ca-4315-8df6-3f1bf7cca353"
    ]
  }
];

export const displaySet = [
  {
    UID: "8fe81838-0fb0-4243-a285-d6adea59b6c5",
    name: "Sales",
    description: "Sales Targets",
    dashboard: [
      { UID: "8fe81838-0fb0-4243-a285-d6adea59b6c5", interval: "8" },
      { UID: "f0396d43-beb4-4749-acaa-0e3e4363bd4d", interval: "5" }
    ]
  },
  {
    UID: "f0396d43-beb4-4749-acaa-0e3e4363bd4d",
    name: "Market",
    description: "Market Targets",
    dashboard: []
  },
  {
    UID: "4f5903a5-e4ca-4315-8df6-3f1bf7cca353",
    name: "Support",
    description: "Support Targets",
    dashboard: []
  }
];

export const dashboardData = [
  {
    UID: "524083fe-22e8-4def-f8ab-97b5f9f03052",
    name: "dashboard1",
    description: "dashboard1",
    editStatus: "NoChange",
    dateCreated: "Fri May 08 2016",
    dateUpdated: "Fri Dec 10 2017",
    enable: true,

    // Border
    // Margin

    /*
    
    https://github.com/STRML/react-grid-layout
    
    //{
    
      // A string corresponding to the component key
      i: string,
    
      // These are all in grid units, not pixels
      x: number,
      y: number,
      w: number,
      h: number,
      minW: ?number = 0,
      maxW: ?number = Infinity,
      minH: ?number = 0,
      maxH: ?number = Infinity,
    
      // If true, equal to `isDraggable: false, isResizable: false`.
      static: ?boolean = false,
      // If false, will not be draggable. Overrides `static`.
      isDraggable: ?boolean = true,
      // If false, will not be resizable. Overrides `static`.
      isResizable: ?boolean = true
    //}
    
    */
    layoutMap: [],
    layouts: {
      lg: [
        {
          i: "0",
          x: 0,
          y: 0,
          w: 2,
          h: 2,
          add: false,
          static: true
        },
        {
          i: "1",
          x: 2,
          y: 0,
          w: 2,
          h: 2,
          add: false
        },
        {
          i: "2",
          x: 4,
          y: 0,
          w: 8,
          h: 1,
          add: false
        },
        {
          i: "3",
          x: 6,
          y: 0,
          w: 2,
          h: 2,
          add: false
        },
        {
          i: "4",
          x: 8,
          y: 0,
          w: 2,
          h: 2,
          add: false
        },
        {
          i: "5",
          x: 10,
          y: 2,
          w: 2,
          h: 2
        },
        {
          i: "6",
          x: 0,
          y: 4,
          w: 2,
          h: 2
        }
      ]
    }
  },

  {
    UID: "2a3872e9-1798-40ad-d2b2-1a8014a744c2",
    name: "dashboard2",
    description: "dashboard2",
    editStatus: "NoChange",
    dateCreated: "Mon Apr 10 2016",
    dateUpdated: "Fri Nov 10 2017",
    layouts: {},
    layoutMap: []
  }
];

export const tileColumns = [
  {
    data: "name",
    title: "Name"
  },
  {
    data: "description",
    title: "Description"
  },
  {
    data: "dateUpdated",
    title: "Date Modified"
  },
  {
    data: "dateCreated",
    title: "Date Created"
  },
  {
    data: "enable",
    title: "Enable",
    className: "dt-center",
    targets: "_all",
    render: function(data, type, full) {
      return data
        ? '<i class="fa fa-circle  text-success"></i>'
        : '<i class="fa fa-circle text-secondary"></i>';
    }
  },
  {
    data: "tileType",
    title: "Tile Type",
    render: function(data, type, full) {
      // tileTypes.map((item, index, value) => {
      //   return (item.value === data) ? item.text : item.value;
      // })

      return data ? data : "";
    }
  },
  {
    data: "dynamicFilter",
    title: "Dynamic Filter",
    render: function(data, type, full) {
      return data
        ? '<i class="fa fa-circle  text-success"></i>'
        : '<i class="fa fa-circle text-secondary"></i>';
    }
  },
  {
    data: "refreshRate",
    title: "Refresh rate (s)",
    render: function(data, type, full) {
      return data
        ? '<span class="badge badge-secondary">' + data + "</span>"
        : '<span class="badge badge-secondary"></span>';
    }
  }
];

import { MenuItem, Menu, Paper } from "material-ui";
import Divider from "material-ui/Divider";
import { styles } from "../dialog/Mui/styles";

export const MenuItems = (values, selected) => {
  return values.map(
    name =>
      name.UID === "remove" ? (
        <span key={name.UID}>
          <Divider />
          <MenuItem
            selected={name.UID === selected ? true : false}
            key={name.UID}
            insetChildren={true}
            checked={values && values.indexOf(name.name) > -1}
            value={name.UID}
            leftIcon={name.icon ? name.icon() : ""}
            primaryText={name.name}
            disabled={name.disabled}
          />
        </span>
      ) : (
        <MenuItem
          style={name.UID === selected ? styles.selectedMenuItem : null}
          key={name.UID}
          insetChildren={true}
          checked={values && values.indexOf(name.name) > -1}
          value={name.UID}
          leftIcon={name.icon ? name.icon() : ""}
          primaryText={name.name}
          disabled={name.disabled}
        />
      )
  );
};

import { Card, CardHeader, CardText } from "material-ui/Card";

export class MenuItemSelectable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      values: this.props.values
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, value) {
    const selected = value.UID;
    this.setState(prevState => {
      return { selected: selected };
    });
    const arr = this.props.values;
    const item = arr.find(function(item) {
      return item.UID === selected;
    });

    this.props.handleChange ? this.props.handleChange(item) : null;
  }

  render() {
    const { values, selected } = this.state;

    // const  values = this.state.values;
    // const selected =this.state.selected;
    return (
      <Card initiallyExpanded style={{ marginBottom: "25px" }}>
        <CardHeader
          title="Chart selector"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
          style={{ background: "rgba(0, 0, 0, 0.1)" }}
        />

        <CardText expandable={true} style={{ padding: 0 }}>
          <Menu disableAutoFocus={true} desktop={true}>
            {values.map(
              name =>
                name.UID === "remove" ? (
                  <span key={name.UID}>
                    <Divider />
                    <MenuItem
                      onClick={this.handleClick}
                      selected={name.UID === selected ? true : false}
                      key={name.UID}
                      insetChildren={true}
                      checked={values && values.indexOf(name.name) > -1}
                      value={name.UID}
                      leftIcon={name.icon ? name.icon() : ""}
                      primaryText={name.name}
                      disabled={name.disabled}
                    />
                  </span>
                ) : (
                  <MenuItem
                    onClick={e => this.handleClick(e, name)}
                    style={
                      name.UID === selected ? styles.selectedMenuItem : null
                    }
                    key={name.UID}
                    insetChildren={true}
                    checked={values && values.indexOf(name.name) > -1}
                    value={name.UID}
                    leftIcon={name.icon ? name.icon() : ""}
                    primaryText={name.name}
                    disabled={name.disabled}
                  />
                )
            )}
          </Menu>
        </CardText>
      </Card>
    );

    return values.map(
      name =>
        name.UID === "remove" ? (
          <span key={name.UID}>
            <Divider />
            <MenuItem
              onClick={this.handleClick}
              selected={name.UID === selected ? true : false}
              key={name.UID}
              insetChildren={true}
              checked={values && values.indexOf(name.name) > -1}
              value={name.UID}
              leftIcon={name.icon ? name.icon() : ""}
              primaryText={name.name}
              disabled={name.disabled}
            />
          </span>
        ) : (
          <MenuItem
            onChange={this.handleClick}
            style={name.UID === selected ? styles.selectedMenuItem : null}
            key={name.UID}
            insetChildren={true}
            checked={values && values.indexOf(name.name) > -1}
            value={name.UID}
            leftIcon={name.icon ? name.icon() : ""}
            primaryText={name.name}
            disabled={name.disabled}
          />
        )
    );
  }
}

import Dashboard from "../bodySections/Dashboard";
import Tile from "../bodySections/Tile";
import Dashboard1 from "../dashboard/Dashboard1";
import Dashboard2 from "../dashboard/Dashboard2";

import DashboardIco from "material-ui/svg-icons/action/dashboard";
import Carousel from "material-ui/svg-icons/action/view-carousel";
import FunctionIco from "material-ui/svg-icons/action/extension";
//import FunctionIco from "material-ui/svg-icons/editor/functions";

import CropSquare from "material-ui/svg-icons/image/crop-square";

export const routes = [
  {
    id: 1,
    primaryText: "Tile",
    icon: () => {
      return <CropSquare />;
    },
    path: "/Tile",
    main: Tile
  },
  {
    id: 0,
    primaryText: "Dashboard",
    icon: () => {
      return <DashboardIco />;
    },
    exact: true,
    path: "/",
    main: Dashboard
  },

  {
    id: 2,
    primaryText: "Display Set",
    icon: () => {
      return <Data />;
    },
    path: "/Display Set",
    main: Dashboard1
  },
  {
    id: 3,
    primaryText: "Display Sets",
    icon: () => {
      null;
    },
    path: "/Display Sets",
    main: Dashboard2
  },

  {
    id: 4,
    primaryText: "Data Connection",
    icon: () => {
      return <FontIcon className="fa fa-briefcase" />;
    },
    path: "/Data Connection",
    main: Dashboard1
  },
  {
    id: 5,
    primaryText: "Data Set",
    icon: () => {
      return <FontIcon className="fa fa-briefcase" />;
    },
    path: "/Data Connection",
    main: Dashboard1
  },
  {
    id: 6,
    primaryText: "Function",
    icon: () => {
      return <FunctionIco />;
    },
    path: "/Function"
  },
  {
    id: 7,
    primaryText: "Style",
    icon: () => {
      return <Style />;
    },
    path: "/Style"
  }
];

import FilterList from "material-ui/svg-icons/content/filter-list";
import Style from "material-ui/svg-icons/image/palette";
import Data from "material-ui/svg-icons/device/storage";
import Alert from "material-ui/svg-icons/social/notifications";
import {
  FormFieldData,
  FormFieldChart,
  FormFieldFilter,
  FormFieldStyle,
  FormFieldAlert
} from "../form/Tile";

export const tileTab = [
  {
    id: 0,
    primaryText: "Data",
    icon: () => {
      return <Data />; ///
    },
    app: () => {
      return <FormFieldData />; ///
    }
  },
  {
    id: 1,
    primaryText: "Chart",
    icon: () => {
      return <FontAwesomeIcon icon="chart-area" />;
    },
    app: () => {
      return <FormFieldChart />; ///
    }
  },
  {
    id: 2,
    primaryText: "Filter",
    icon: () => {
      return <FilterList />;
    },
    app: () => {
      return <FormFieldFilter />; ///
    }
  },
  {
    id: 3,
    primaryText: "Style",
    icon: () => {
      return <Style />;
    },
    app: () => {
      return <FormFieldStyle />; ///
    }
  },
  {
    id: 4,
    primaryText: "Alert",
    icon: () => {
      return <Alert />;
    },
    app: () => {
      return <FormFieldAlert />; ///
    }
  }
];

import SortIcon from "material-ui/svg-icons/Content/sort";
import SettingsIcon from "material-ui/svg-icons/Action/settings";

export const mappedListItems = [
  {
    value: "editColumn",
    text: "Edit Column",
    icon: () => {
      return <SettingsIcon />;
    }
  },
  {
    value: "divider",
    text: "divider",
    icon: () => {
      return <DynamicListIco />;
    }
  },
  {
    value: "sort",
    text: "Sort",
    icon: () => {
      return <SortIcon />;
    },
    nestedItems: [
      {
        value: "none",
        text: "None",
        icon: () => {
          return <DynamicListIco />;
        }
      },

      {
        value: "az",
        text: "A-Z",
        icon: () => {
          return <DynamicListIco />;
        }
      },
      {
        value: "za",
        text: "Z-A",
        icon: () => {
          return <DynamicListIco />;
        }
      }
    ]
  }
];

export const getDataStructure = [
  {
    name: "TileData",
    description: "TileData",
    module: "tile",
    data: tileData
  },
  {
    name: "Dashboard",
    description: "Dashboard",
    module: "dashboard",
    data: dashboardData
  },
  {
    name: "Display Set",
    description: "Display Set",
    module: "displaySet",
    data: displaySet
  },
  {
    name: "Display Sets",
    description: "Display Sets",
    module: "displaySets",
    data: displaySets
  }
];

export const tileFormFields = [
  {
    name: "TileData",
    description: "TileData",
    module: "tile",
    data: tileData
  },
  {
    name: "Dashboard",
    description: "Dashboard",
    module: "dashboard",
    data: tileData
  }
];

export const saveDialog = (key, UID) => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
};

export const get_FromLS = UID => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(UID)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls;
};

export const save_ToLS = data => {
  if (global.localStorage) {
    global.localStorage.setItem(data.UID, JSON.stringify(data));
  }
  // and save to server also
};

export const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

export const tblClassNames = [
  {
    value: "",
    text: "default"
  },
  {
    value: "table-bordered",
    text: "Bordered"
  },
  {
    value: "table-dark",
    text: "Dark"
  },
  {
    value: "table-striped table-dark",
    text: "Dark striped"
  }
];

export const refreshRates = [
  {
    value: "null",
    text: "Static - default"
  },
  {
    value: "1",
    text: "1"
  },
  {
    value: "2",
    text: "2"
  },
  {
    value: "3",
    text: "3"
  },
  {
    value: "4",
    text: "4"
  },
  {
    value: "5",
    text: "5"
  }
];

import Add from "material-ui/svg-icons/content/add";
import Remove from "material-ui/svg-icons/content/remove";
import Search from "material-ui/svg-icons/action/search";
import ContentCopy from "material-ui/svg-icons/content/content-copy";

export const dashboardTileMenu = [
  // {
  //   UID: "new",
  //   name: "New",
  //   disabled: true,
  //   icon: () => {
  //     return <Add />;
  //   }
  // },
  {
    UID: "static",
    name: "Toggle static",
    icon: () => {
      return <FontAwesomeIcon icon="thumbtack" />;
    }
  },
  {
    UID: "search",
    name: "Search",
    disabled: false,
    icon: () => {
      return <Search />;
    }
  },
  {
    UID: "copy",
    name: "Copy",
    disabled: true,
    icon: () => {
      return <ContentCopy />;
    }
  },
  {
    UID: "rmove",
    name: "Remove",
    disabled: false,
    icon: () => {
      return <Remove />;
    }
  }
  // {
  //   UID: "edit",
  //   name: "Edit",
  //   icon: () => {
  //     return (
  //       <FontIcon className="material-icons" style={iconStyles}>
  //         home
  //       </FontIcon>
  //     );
  //   }
  // },

  // {
  //   UID: "search",
  //   name: "Search",
  //   icon: () => {
  //     return <i className="fa fa-sitemap" />;
  //   }
  // },
];
