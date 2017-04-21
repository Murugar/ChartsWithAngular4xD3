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
var PieChartComponent = (function () {
    function PieChartComponent() {
        this.title = 'D3.js with Angular 2!';
        this.subtitle = 'Pie Chart';
        this.margin = { top: 20, right: 20, bottom: 30, left: 50 };
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.width, this.height) / 2;
    }
    PieChartComponent.prototype.ngOnInit = function () {
        this.initSvg();
        this.drawPie();
    };
    PieChartComponent.prototype.initSvg = function () {
        this.color = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888",
            "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        this.arc = d3.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(0);
        this.labelArc = d3.arc()
            .outerRadius(this.radius - 40)
            .innerRadius(this.radius - 40);
        this.pie = d3.pie()
            .sort(null)
            .value(function (d) { return d.population; });
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
        ;
    };
    PieChartComponent.prototype.drawPie = function () {
        var _this = this;
        var g = this.svg.selectAll(".arc")
            .data(this.pie(data_1.Stats))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path").attr("d", this.arc)
            .style("fill", function (d) { return _this.color(d.data.age); });
        g.append("text").attr("transform", function (d) { return "translate(" + _this.labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function (d) { return d.data.age; });
    };
    return PieChartComponent;
}());
PieChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'cm-pie-chart',
        templateUrl: 'pie-chart.component.html'
    }),
    __metadata("design:paramtypes", [])
], PieChartComponent);
exports.PieChartComponent = PieChartComponent;
//# sourceMappingURL=pie-chart.component.js.map