import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { BasicChartsComponent }   from './basic-charts.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ForceDirectedGraphComponent } from './force-directed-graph/force-directed-graph.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MultiSeriesLineChartComponent } from './multi-series-line-chart/multi-series-line-chart.component';

const routes: Routes = [
    {
        path: '',
        component: BasicChartsComponent,
        children: [
            { path: 'line-chart', component: LineChartComponent },
            { path: 'force-directed-graph', component: ForceDirectedGraphComponent },
            { path: 'bubble-chart', component: BubbleChartComponent },
            { path: 'bar-chart', component: BarChartComponent },
            { path: 'multi-series-line-chart', component: MultiSeriesLineChartComponent },
            { path: 'pie-chart', component: PieChartComponent }
        ]
    }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
})
export class BasicChartsRoutingModule {
    

    static components = [BasicChartsComponent, LineChartComponent,
        ForceDirectedGraphComponent, BubbleChartComponent, BarChartComponent,
        MultiSeriesLineChartComponent, PieChartComponent];

    constructor(private router: Router) {
        router.navigate(['/basic-charts/line-chart']);
    }

    ngOnInit() {
        this.router.navigate(['/basic-charts/line-chart']);
    }

}
