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
var BarChartComponent = (function () {
    function BarChartComponent() {
        this.title = 'D3.js with Angular 2!';
        this.subtitle = 'Bar Chart';
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
    }
    BarChartComponent.prototype.ngOnInit = function () {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    };
    BarChartComponent.prototype.initSvg = function () {
        this.svg = d3.select("svg");
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        ;
    };
    BarChartComponent.prototype.initAxis = function () {
        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(data_1.STATISTICS.map(function (d) { return d.letter; }));
        this.y.domain([0, d3.max(data_1.STATISTICS, function (d) { return d.frequency; })]);
    };
    BarChartComponent.prototype.drawAxis = function () {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y).ticks(10, "%"))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");
    };
    BarChartComponent.prototype.drawBars = function () {
        var _this = this;
        this.g.selectAll(".bar")
            .data(data_1.STATISTICS)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return _this.x(d.letter); })
            .attr("y", function (d) { return _this.y(d.frequency); })
            .attr("width", this.x.bandwidth())
            .attr("height", function (d) { return _this.height - _this.y(d.frequency); });
    };
    return BarChartComponent;
}());
BarChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'cm-bar-chart',
        templateUrl: 'bar-chart.component.html'
    }),
    __metadata("design:paramtypes", [])
], BarChartComponent);
exports.BarChartComponent = BarChartComponent;
//# sourceMappingURL=bar-chart.component.js.map