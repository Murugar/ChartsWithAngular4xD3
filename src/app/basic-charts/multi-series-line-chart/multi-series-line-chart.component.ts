
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import * as d3 from 'd3';


import {  Temperatures } from '../../shared/data';

@Component( {
    moduleId: module.id,
    selector: 'cm-multi-series-line-chart',
    templateUrl: 'multi-series-line-chart.component.html'
})


export class MultiSeriesLineChartComponent implements OnInit {
    

    title: string = 'D3.js with Angular 2!';
    subtitle: string = 'Multi-Series Line Chart';

    data: any;

    svg: any;
    margin = { top: 20, right: 80, bottom: 30, left: 50 };
    g: any;
    width: number;
    height: number;
    x : any;
    y : any;
    z : any;
    line : any;

    constructor() {

    }

    ngOnInit() {

        this.data = Temperatures.map(( v ) => v.values.map(( v ) => v.date ) )[0];
        //.reduce((a, b) => a.concat(b), []);

        this.initChart();
        this.drawAxis();
        this.drawPath();
    }

    private initChart(): void {
        this.svg = d3.select( "svg" );

        this.width = this.svg.attr( "width" ) - this.margin.left - this.margin.right;
        this.height = this.svg.attr( "height" ) - this.margin.top - this.margin.bottom;

        this.g = this.svg.append( "g" ).attr( "transform", 
                "translate(" + this.margin.left + "," + this.margin.top + ")" );

        this.x = d3.scaleTime().range( [0, this.width] );
        this.y = d3.scaleLinear().range( [this.height, 0] );
        this.z = d3.scaleOrdinal( d3.schemeCategory10 );

        this.line = d3.line()
            .curve( d3.curveBasis )
            .x(( d: any ) => this.x( d.date ) )
            .y(( d: any ) => this.y( d.temperature ) );

        this.x.domain( d3.extent( this.data, ( d: Date ) => d ) );

        this.y.domain( [
            d3.min( Temperatures, function( c ) { return d3.min( c.values, function( d ) { return d.temperature; }); }),
            d3.max( Temperatures, function( c ) { return d3.max( c.values, function( d ) { return d.temperature; }); })
        ] );

        this.z.domain( Temperatures.map( function( c ) { return c.id; }) );
    }

    private drawAxis(): void {
        this.g.append( "g" )
            .attr( "class", "axis axis--x" )
            .attr( "transform", "translate(0," + this.height + ")" )
            .call( d3.axisBottom( this.x ) );

        this.g.append( "g" )
            .attr( "class", "axis axis--y" )
            .call( d3.axisLeft( this.y ) )
            .append( "text" )
            .attr( "transform", "rotate(-90)" )
            .attr( "y", 6 )
            .attr( "dy", "0.71em" )
            .attr( "fill", "#000" )
            .text( "Temperature, ºF" );
    }

    private drawPath(): void {
        let city = this.g.selectAll( ".city" )
            .data( Temperatures )
            .enter().append( "g" )
            .attr( "class", "city" );

        city.append( "path" )
            .attr( "class", "line" )
            .attr( "d", ( d : any) => this.line( d.values ) )
            .style( "stroke", ( d : any ) => this.z( d.id ) );

        city.append( "text" )
            .datum( function( d : any ) { return { id: d.id, value: d.values[d.values.length - 1] }; })
            .attr( "transform", ( d : any) => "translate(" + this.x( d.value.date ) + "," + this.y( d.value.temperature ) + ")" )
            .attr( "x", 3 )
            .attr( "dy", "0.35em" )
            .style( "font", "10px sans-serif" )
            .text( function( d : any) { return d.id; });
    }
}