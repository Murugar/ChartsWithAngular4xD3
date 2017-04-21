"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var d3 = require("d3");
var data_1 = require("../../shared/data");
var MultiSeriesLineChartComponent = (function () {
    function MultiSeriesLineChartComponent() {
        this.title = 'D3.js with Angular 2!';
        this.subtitle = 'Multi-Series Line Chart';
        this.margin = { top: 20, right: 80, bottom: 30, left: 50 };
    }
    MultiSeriesLineChartComponent.prototype.ngOnInit = function () {
        this.data = data_1.Temperatures.map(function (v) { return v.values.map(function (v) { return v.date; }); })[0];
        //.reduce((a, b) => a.concat(b), []);
        this.initChart();
        this.drawAxis();
        this.drawPath();
    };
    MultiSeriesLineChartComponent.prototype.initChart = function () {
        var _this = this;
        this.svg = d3.select("svg");
        this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.z = d3.scaleOrdinal(d3.schemeCategory10);
        this.line = d3.line()
            .curve(d3.curveBasis)
            .x(function (d) { return _this.x(d.date); })
            .y(function (d) { return _this.y(d.temperature); });
        this.x.domain(d3.extent(this.data, function (d) { return d; }));
        this.y.domain([
            d3.min(data_1.Temperatures, function (c) { return d3.min(c.values, function (d) { return d.temperature; }); }),
            d3.max(data_1.Temperatures, function (c) { return d3.max(c.values, function (d) { return d.temperature; }); })
        ]);
        this.z.domain(data_1.Temperatures.map(function (c) { return c.id; }));
    };
    MultiSeriesLineChartComponent.prototype.drawAxis = function () {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Temperature, ºF");
    };
    MultiSeriesLineChartComponent.prototype.drawPath = function () {
        var _this = this;
        var city = this.g.selectAll(".city")
            .data(data_1.Temperatures)
            .enter().append("g")
            .attr("class", "city");
        city.append("path")
            .attr("class", "line")
            .attr("d", function (d) { return _this.line(d.values); })
            .style("stroke", function (d) { return _this.z(d.id); });
        city.append("text")
            .datum(function (d) { return { id: d.id, value: d.values[d.values.length - 1] }; })
            .attr("transform", function (d) { return "translate(" + _this.x(d.value.date) + "," + _this.y(d.value.temperature) + ")"; })
            .attr("x", 3)
            .attr("dy", "0.35em")
            .style("font", "10px sans-serif")
            .text(function (d) { return d.id; });
    };
    return MultiSeriesLineChartComponent;
}());
MultiSeriesLineChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'cm-multi-series-line-chart',
        templateUrl: 'multi-series-line-chart.component.html'
    }),
    __metadata("design:paramtypes", [])
], MultiSeriesLineChartComponent);
exports.MultiSeriesLineChartComponent = MultiSeriesLineChartComponent;
//# sourceMappingURL=multi-series-line-chart.component.js.map