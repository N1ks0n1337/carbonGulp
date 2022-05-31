// "use strict";
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("app.js");

  function tooggleActive(el) {
    if (!document.getElementsByClassName(el)) return;

    const collect = document.getElementsByClassName(el);

    for (let itm of collect) {
      let targ = document.querySelector(itm.dataset.target);

      itm.addEventListener("click", (e) => {
        e.preventDefault();
        itm.classList.toggle("active");
        targ.classList.toggle("active");
        addModifier(".aside");
      });
    }
  }
  tooggleActive("js-burger");

  function checkElementActive(selector) {
    return document.querySelector(selector).classList.contains("active");
  }

  function addModifier(selector) {
    let modifier = selector.split("").slice(1).join("");

    if (checkElementActive(selector)) {
      document.documentElement.classList.add(`${modifier}-active`);
      document.body.classList.add(`${modifier}-active`);
    } else {
      document.documentElement.classList.remove(`${modifier}-active`);
      document.body.classList.remove(`${modifier}-active`);
    }
  }

  if (document.body.classList.contains(`body_login`)) {
    document.documentElement.classList.add(`html_login`);
  }
  if (document.body.classList.contains(`body_index`)) {
    document.documentElement.classList.add(`html_index`);
  }

  function dropdown(el) {
    if (!document.querySelector(el)) return;

    const collect = document.querySelectorAll(el);

    for (let itm of collect) {
      itm.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("active");
      });
    }

    window.addEventListener("click", (e) => {
      if (!e.target.closest(el)) {
        for (let itm of collect) {
          if (itm.classList.contains("active")) {
            itm.classList.remove("active");
          }
        }
      }
    });
  }
  dropdown(".js-dropdown");

  function togglePassVisiblity(el) {
    if (!document.querySelector(el)) return;

    const collect = document.querySelectorAll(el);

    for (let itm of collect) {
      let targ = document.querySelector(itm.dataset.target);

      itm.addEventListener("click", (e) => {
        e.preventDefault();

        if (targ.type == "password") {
          targ.type = "text";
          e.currentTarget.classList.add("active");
        } else {
          targ.type = "password";
          e.currentTarget.classList.remove("active");
        }
      });
    }
  }
  togglePassVisiblity(".js-toggle-pass");

  function toggleCheckbox(el) {
    if (!document.querySelector(el)) return;
    const collect = document.querySelectorAll(el);

    for (let itm of collect) {
      itm.addEventListener("keypress", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
          e.currentTarget.checked = !e.currentTarget.checked;
        }
      });
    }
  }
  toggleCheckbox(".js-keypress-check");

  function tabs(tab, targ) {
    if (!document.querySelector(tab) || !document.querySelector(targ)) return;

    const links = document.querySelectorAll(tab);
    const targets = document.querySelectorAll(targ);

    for (let link of links) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        let targ = link.dataset.target;

        for (let link of links) {
          link.classList.remove("active");
        }
        for (let targ of targets) {
          targ.classList.remove("active");
        }
        for (let tg of document.querySelectorAll(targ)) {
          tg.classList.add("active");
        }
        e.currentTarget.classList.add("active");
      });
    }
  }
  tabs(".js-tab", ".js-tab-content");

  function tooggleVisible(el) {
    if (!document.getElementsByClassName(el)) return;

    const collect = document.getElementsByClassName(el);

    for (let itm of collect) {
      let hideEls = document.querySelectorAll(itm.dataset.hide),
        showEls = document.querySelectorAll(itm.dataset.show);

      itm.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("qw");
        for (let elem of hideEls) {
          elem.classList.add("hidden");
        }
        for (let elem of showEls) {
          elem.classList.remove("hidden");
        }
      });
    }
  }
  tooggleVisible("js-toggle-visible");

  function openModal(el) {
    if (!document.querySelector(el)) return;

    const collect = document.querySelectorAll(el);

    for (let elem of collect) {
      let targ = elem.dataset.modalContent;
      let targModal = document.querySelector(targ);
      let close = targModal.querySelector(".js-modal-close");

      const modal = new tingle.modal({
        cssClass: ["tingle-modal_custom"],
        onOpen: function () {
          console.log("modal opened");
        },
        onClose: function () {
          console.log("modal closed");
        },
      });
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        modal.setContent(targModal);
        modal.open();
      });

      close.addEventListener("click", (e) => {
        e.preventDefault();
        modal.close();
      });
    }
  }
  openModal("[data-modal-content]");

  $(".js-select").select2({
    minimumResultsForSearch: Infinity,
    selectionCssClass: "select_custom",
    dropdownCssClass: "select_custom",
    // allowClear: true,
  });
  $(".js-select-search").select2({
    selectionCssClass: "select_custom",
    dropdownCssClass: "select_custom",
    // allowClear: true,
  });

  tippy("[data-tippy-content]", {
    placement: "right",
    arrow: false,
    theme: "tooltip",
  });

  tippy(".js-filtration", {
    placement: "bottom",
    arrow: false,
    trigger: "click",
    interactive: true,
    theme: "filtration",

    content(elem) {
      const template = elem.nextElementSibling;
      return template.innerHTML;
    },
    allowHTML: true,
    onShow(elem) {
      console.log("tooltip opened");
    },
    onHide(elem) {
      console.log("tooltip closed");
    },
  });

  flatpickr(".js-datepicker", {
    locale: "ru",
  });
  function onMonthOrYearChange(dObj, dStr, fp) {
    fp.setDate(new Date(fp.currentYear, fp.currentMonth));
  }
  flatpickr(".js-monthpicker", {
    locale: "ru",
    onReady(_, __, fp) {
      fp.calendarContainer.classList.add("no-days");
    },
    onYearChange: [onMonthOrYearChange],
    onMonthChange: [onMonthOrYearChange],
  });

  function scheme(el) {
    if (!document.querySelector(el)) return;
    let chart;
    d3.csv(
      "assets/upload/structure.csv"
      // "https://msadminecopass.bitbucket.io/build/assets/upload/structure.csv"
    ).then((dataFlattened) => {
      chart = new d3.OrgChart()
        .container(el)
        .data(dataFlattened)
        .nodeWidth((d) => 330)
        .initialZoom(1)
        .nodeHeight((d) => 140)
        .childrenMargin((d) => 40)
        .compactMarginBetween((d) => 15)
        .compactMarginPair((d) => 80)
        .nodeContent(function (d, i, arr, state) {
          let txtMarkerA = "";
          let txtMarkerM = "";
          let txtMarkerO = "";

          if (d.data.positionAdmin.length > 0) {
            txtMarkerA = `<div class="txt-marker txt-marker_type-1"> ${d.data.positionAdmin} </div>`;
          }

          if (d.data.positionManager.length > 0) {
            txtMarkerM = `<div class="txt-marker txt-marker_type-2"> ${d.data.positionManager} </div>`;
          }

          if (d.data.positionOperator.length > 0) {
            txtMarkerO = `<div class="txt-marker txt-marker_type-3"> ${d.data.positionOperator} </div>`;
          }

          return `
            <div class="scheme-block">
              <div class="scheme-block__title"> ${d.data.name} </div>
  
              <div class="scheme-block__bar"> 
                <div class="scheme-block__bar-itm">
                  <div class="scheme-block__txt-marker">
                    ${txtMarkerA}
                    ${txtMarkerM}
                    ${txtMarkerO}
                  </div>
                </div>
                <div class="scheme-block__bar-itm">
                  <div class="clr-marker clr-marker_${d.data.markerType}"></div>
                  <div class="scheme-block__add js-add-element">+</div>
                </div>
              </div>
            </div>
          `;
        })
        .render();
      if (document.querySelector(".scheme__zoom")) {
        document.querySelector(".scheme__zoom").classList.add("active");
      }
    });

    if (document.querySelector(".js-cheme-zoom-in")) {
      document
        .querySelector(".js-cheme-zoom-in")
        .addEventListener("click", (e) => chart.zoomIn());
    }
    if (document.querySelector(".js-cheme-zoom-out")) {
      document
        .querySelector(".js-cheme-zoom-out")
        .addEventListener("click", (e) => chart.zoomOut());
    }
  }
  scheme(".js-scheme");

  tippy(".js-scheme-tippy", {
    placement: "bottom",
    arrow: false,
    trigger: "click",
    interactive: true,
    theme: "scheme",

    content(elem) {
      const template = elem.nextElementSibling;
      return template.innerHTML;
    },
    allowHTML: true,
  });

  window.addEventListener("click", (e) => {
    if (e.target.matches(".js-add-element")) {
      document.querySelector(".js-scheme-tippy")._tippy.show();
    }
  });

  function schemeReport(el) {
    if (!document.querySelector(el)) return;
    let chart;
    d3.csv("assets/upload/structure_report.csv").then((dataFlattened) => {
      chart = new d3.OrgChart()
        .container(el)
        .data(dataFlattened)
        .nodeWidth((d) => 430)
        .initialZoom(1)
        .nodeHeight((d) => 160)
        .childrenMargin((d) => 40)
        .compactMarginBetween((d) => 15)
        .compactMarginPair((d) => 80)
        .nodeContent(function (d, i, arr, state) {
          return `
              <div class="scheme-block">
                <div class="scheme-block__content"> 
                  <div class="scheme-block__content-itm">
                    <div class="scheme-block__title"> ${d.data.name} </div>
                    <div class="scheme-block__val">
                      ${d.data.value}
                      <div class="scheme-block__val-descr">${d.data.valueDescr}</div>
                    </div>
                  </div>

                  <div class="scheme-block__content-itm">
                    <div class="scheme-block__graph"> сюда вставляй график </div>
                  </div>
                </div>
              </div>
            `;
        })
        .render();
      if (document.querySelector(".scheme__zoom")) {
        document.querySelector(".scheme__zoom").classList.add("active");
      }
    });

    if (document.querySelector(".js-cheme-zoom-in")) {
      document
        .querySelector(".js-cheme-zoom-in")
        .addEventListener("click", (e) => chart.zoomIn());
    }
    if (document.querySelector(".js-cheme-zoom-out")) {
      document
        .querySelector(".js-cheme-zoom-out")
        .addEventListener("click", (e) => chart.zoomOut());
    }
  }
  schemeReport(".js-scheme_report");

  Highcharts.setOptions({
    chart: {
      spacingTop: 10,
      spacingLeft: 0,
      spacingRight: 0,
      spacingBottom: 0,
      style: {
        fontFamily: "'Museo Sans Cyrl', Arial, Helvetica, sans- serif",
        color: "#21251f",
      },
    },

    title: {
      align: "left",
      color: "#21251f",
    },

    subtitle: {
      align: "left",
    },

    tooltip: {
      enabled: true,
    },

    legend: {
      enabled: false,
      itemStyle: {
        color: "#21251f",
      },
    },

    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
      },
    },
  });

  if (document.querySelector("#graph-1")) {
    Highcharts.chart("graph-1", {
      chart: {
        type: "column",
      },

      title: {
        text: "Объем производства железорудной продукции | млн тонн",
      },

      xAxis: {
        title: {
          text: null,
        },
        categories: ["2018", "2019", "2020"],
      },

      yAxis: {
        title: {
          text: null,
        },
        gridLineColor: "transparent",
        labels: {
          enabled: false,
        },
      },

      tooltip: {
        valueSuffix: " млн тонн",
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
        },
      },

      legend: {
        enabled: true,
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
      },

      series: [
        {
          name: "ГБЖ/ПВЖ",
          data: [7.8, 7.9, 7.8],
        },
        {
          name: "Окатыши",
          data: [27.7, 28.1, 27.6],
        },
        {
          name: "Железорудный концентрат",
          data: [40.4, 40.2, 40.5],
        },
      ],
    });
  }

  if (document.querySelector("#graph-6")) {
    Highcharts.chart("graph-6", {
      chart: {
        type: "column",
      },

      title: {
        text: "Объем производства металлургической продукции | млн тонн",
      },

      xAxis: {
        title: {
          text: null,
        },
        categories: ["2018", "2019", "2020"],
      },

      yAxis: {
        title: {
          text: null,
        },
        gridLineColor: "transparent",
        labels: {
          enabled: false,
        },
      },

      tooltip: {
        valueSuffix: " млн тонн",
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
        },
      },

      legend: {
        enabled: true,
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
      },

      series: [
        {
          name: "Сталь",
          data: [1.6, 1.4, 1.5],
        },
        {
          name: "Чугун",
          data: [3.0, 2.7, 2.3],
        },
      ],
    });
  }

  if (document.querySelector("#graph-2")) {
    Highcharts.chart("graph-2", {
      chart: {
        type: "column",
      },

      title: {
        text: null,
      },

      legend: { enabled: true },

      yAxis: [
        {
          title: {
            text: null,
          },
        },
      ],

      plotOptions: {
        column: {
          borderRadius: 5,
        },
      },

      xAxis: {
        categories: [
          "Каменный уголь",
          "Дизельное топливо",
          "Мазут",
          "Природный газ",
          "Древесные пелеты",
        ],
      },

      series: [
        {
          name: "Текущий перод",
          data: [60, 78, 76, 80, 20],
        },
        {
          name: "Прошедший период",
          data: [40, 50, 78, 55, 15],
        },
      ],
    });
  }

  if (document.querySelector("#graph-3")) {
    Highcharts.chart("graph-3", {
      title: {
        text: "Название графика",
      },

      subtitle: {
        text: "Описание",
      },

      data: {
        csvURL:
          "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv",
        beforeParse: function (csv) {
          return csv.replace(/\n\n/g, "\n");
        },
      },

      yAxis: [
        {
          title: {
            text: "Заголовк для оси",
          },
          labels: {
            align: "left",
            x: 3,
            y: 16,
            format: "{value:.,0f}",
          },
          showFirstLabel: false,
        },
        {
          linkedTo: 0,
          gridLineWidth: 0,
          opposite: true,
          title: {
            text: null,
          },
          labels: {
            align: "right",
            x: -3,
            y: 16,
            format: "{value:.,0f}",
          },
          showFirstLabel: false,
        },
      ],

      xAxis: {
        tickInterval: 7 * 24 * 3600 * 1000,
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
          align: "left",
          x: 3,
          y: -3,
        },
        accessibility: {
          rangeDescription: "Range: 2010 to 2017",
        },
      },

      legend: {
        enabled: true,
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
      },

      tooltip: {
        shared: true,
        crosshairs: true,
      },
    });
  }

  if (document.querySelector("#graph-4")) {
    Highcharts.getJSON(
      "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json",
      (data) => {
        let detailChart;

        // create the detail chart
        function createDetail(masterChart) {
          // prepare the detail chart
          var detailData = [],
            detailStart = data[0][0];

          masterChart.series[0].data.forEach((point) => {
            if (point.x >= detailStart) {
              detailData.push(point.y);
            }
          });

          // create a detail chart referenced by a global variable
          detailChart = Highcharts.chart("detail-container", {
            chart: {
              marginBottom: 120,
              reflow: false,
              marginLeft: 50,
              marginRight: 20,
              style: {
                position: "absolute",
              },
            },
            credits: {
              enabled: false,
            },
            title: {
              text: "Заголовок",
            },
            subtitle: {
              text: "Описание",
            },
            xAxis: {
              type: "datetime",
            },
            yAxis: {
              title: {
                text: null,
              },
              maxZoom: 0.1,
            },
            tooltip: {
              formatter: function () {
                var point = this.points[0];
                return (
                  "<b>" +
                  point.series.name +
                  "</b><br/>" +
                  Highcharts.dateFormat("%A %B %e %Y", this.x) +
                  ":<br/>" +
                  "1 USD = " +
                  Highcharts.numberFormat(point.y, 2) +
                  " EUR"
                );
              },
              shared: true,
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                  states: {
                    hover: {
                      enabled: true,
                      radius: 3,
                    },
                  },
                },
              },
            },
            series: [
              {
                name: "USD to EUR",
                pointStart: detailStart,
                pointInterval: 24 * 3600 * 1000,
                data: detailData,
              },
            ],

            exporting: {
              enabled: false,
            },
          }); // return chart
        }

        // create the master chart
        function createMaster() {
          Highcharts.chart(
            "master-container",
            {
              chart: {
                reflow: false,
                borderWidth: 0,
                backgroundColor: null,
                marginLeft: 50,
                marginRight: 20,
                zoomType: "x",
                events: {
                  // listen to the selection event on the master chart to update the
                  // extremes of the detail chart
                  selection: function (event) {
                    var extremesObject = event.xAxis[0],
                      min = extremesObject.min,
                      max = extremesObject.max,
                      detailData = [],
                      xAxis = this.xAxis[0];

                    // reverse engineer the last part of the data
                    this.series[0].data.forEach((point) => {
                      if (point.x > min && point.x < max) {
                        detailData.push([point.x, point.y]);
                      }
                    });

                    // move the plot bands to reflect the new detail span
                    xAxis.removePlotBand("mask-before");
                    xAxis.addPlotBand({
                      id: "mask-before",
                      from: data[0][0],
                      to: min,
                      color: "rgba(0, 0, 0, 0.2)",
                    });

                    xAxis.removePlotBand("mask-after");
                    xAxis.addPlotBand({
                      id: "mask-after",
                      from: max,
                      to: data[data.length - 1][0],
                      color: "rgba(0, 0, 0, 0.2)",
                    });

                    detailChart.series[0].setData(detailData);

                    return false;
                  },
                },
              },
              title: {
                text: null,
              },
              accessibility: {
                enabled: false,
              },
              xAxis: {
                type: "datetime",
                showLastTickLabel: true,
                maxZoom: 14 * 24 * 3600000, // fourteen days
                plotBands: [
                  {
                    id: "mask-before",
                    from: data[0][0],
                    to: data[data.length - 1][0],
                    color: "rgba(0, 0, 0, 0.2)",
                  },
                ],
                title: {
                  text: null,
                },
              },
              yAxis: {
                gridLineWidth: 0,
                labels: {
                  enabled: false,
                },
                title: {
                  text: null,
                },
                min: 0.6,
                showFirstLabel: false,
              },
              tooltip: {
                formatter: function () {
                  return false;
                },
              },
              legend: {
                enabled: false,
              },
              credits: {
                enabled: false,
              },
              plotOptions: {
                series: {
                  fillColor: {
                    linearGradient: [0, 0, 0, 70],
                    stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, "rgba(255,255,255,0)"],
                    ],
                  },
                  lineWidth: 1,
                  marker: {
                    enabled: false,
                  },
                  shadow: false,
                  states: {
                    hover: {
                      lineWidth: 1,
                    },
                  },
                  enableMouseTracking: false,
                },
              },

              series: [
                {
                  type: "area",
                  name: "USD to EUR",
                  pointInterval: 24 * 3600 * 1000,
                  pointStart: data[0][0],
                  data: data,
                },
              ],

              exporting: {
                enabled: false,
              },
            },
            (masterChart) => {
              createDetail(masterChart);
            }
          ); // return chart instance
        }

        // make the container smaller and add a second container for the master chart
        const container = document.getElementById("graph-4");
        container.style.position = "relative";
        container.innerHTML +=
          '<div id="detail-container"></div><div id="master-container"></div>';

        // create master and in its callback, create the detail chart
        createMaster();
      }
    );
  }

  if (document.querySelector("#graph-5")) {
    ["mousemove", "touchmove", "touchstart"].forEach(function (eventType) {
      document
        .getElementById("graph-5")
        .addEventListener(eventType, function (e) {
          var chart, point, i, event;

          for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            chart = Highcharts.charts[i];
            // Find coordinates within the chart
            event = chart.pointer.normalize(e);
            // Get the hovered point
            point = chart.series[0].searchPoint(event, true);

            if (point) {
              point.highlight(e);
            }
          }
        });
    });

    /**
     * Override the reset function, we don't need to hide the tooltips and
     * crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };

    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    Highcharts.Point.prototype.highlight = function (event) {
      event = this.series.chart.pointer.normalize(event);
      this.onMouseOver(); // Show the hover marker
      this.series.chart.tooltip.refresh(this); // Show the tooltip
      this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
      var thisChart = this.chart;

      if (e.trigger !== "syncExtremes") {
        // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) {
              // It is null while updating
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                trigger: "syncExtremes",
              });
            }
          }
        });
      }
    }

    // Get the data. The contents of the data file can be viewed at
    Highcharts.ajax({
      url: "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/activity.json",
      dataType: "text",
      success: function (activity) {
        activity = JSON.parse(activity);
        activity.datasets.forEach(function (dataset, i) {
          // Add X values
          dataset.data = Highcharts.map(dataset.data, function (val, j) {
            return [activity.xData[j], val];
          });

          var chartDiv = document.createElement("div");
          chartDiv.className = "chart";
          document.getElementById("graph-5").appendChild(chartDiv);

          Highcharts.chart(chartDiv, {
            chart: {
              spacingTop: 20,
              spacingBottom: 20,
              height: 300,
            },
            title: {
              text: dataset.name,
              margin: 0,
              x: 30,
            },
            xAxis: {
              crosshair: true,
              events: {
                setExtremes: syncExtremes,
              },
              labels: {
                format: "{value} km",
              },
            },
            yAxis: {
              title: {
                text: null,
              },
            },
            tooltip: {
              positioner: function () {
                return {
                  // right aligned
                  x: this.chart.chartWidth - this.label.width,
                  y: 10, // align to title
                };
              },
              borderWidth: 0,
              backgroundColor: "none",
              pointFormat: "{point.y}",
              headerFormat: "",
              shadow: false,
              style: {
                fontSize: "18px",
              },
              valueDecimals: dataset.valueDecimals,
            },
            series: [
              {
                data: dataset.data,
                name: dataset.name,
                type: dataset.type,
                color: Highcharts.getOptions().colors[i],
                fillOpacity: 0.3,
                tooltip: {
                  valueSuffix: " " + dataset.unit,
                },
              },
            ],
          });
        });
      },
    });
  }
});
