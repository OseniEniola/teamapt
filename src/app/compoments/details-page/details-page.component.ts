import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import GSTC, { Config, GSTCResult } from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';

// import GSTC, { Config, GSTCResult } from '../../../gstc-public';
// import { Plugin as TimelinePointer } from '../../../gstc-public/dist/plugins/timeline-pointer.esm.min.js';
// import { Plugin as Selection } from '../../../gstc-public/dist/plugins/selection.esm.min.js';

@Component({
   selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: [
    './details-page.component.scss',
    '../../../../node_modules/gantt-schedule-timeline-calendar/dist/style.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPageComponent implements OnInit {
  @ViewChild('gstcElement', { static: true }) gstcElement: ElementRef;
  gstc: GSTCResult;

  generateConfig(): Config {
    const iterations = 16;
    // GENERATE SOME ROWS

      const rows:any = {};
      for (let i = 0; i < iterations; i++) {
        const withParent = i > 0 && i % 2 === 0;
        const id = GSTC.api.GSTCID(i.toString());
        rows[id] = {
          id,
          label: 'Staff ' + i,
          parentId: withParent ? GSTC.api.GSTCID((i - 1).toString()) : undefined,
          expanded: false,
        };
      }

    // GENERATE SOME ROW -> ITEMS

    let start = GSTC.api.date().startOf('day').subtract(10, 'day');
    const items:any = {};
    for (let i = 0; i < 16; i++) {
      const id = GSTC.api.GSTCID(i.toString());
      start = start.add(1,'day');
      items[id] = {
        id,
        label: 'User id ' + i,
        time: {
          start: start.valueOf(),
          end: start.add((Math.random() * (5-1)),'day').valueOf(),
        },
        rowId: id,
      };
    }

    // LEFT SIDE LIST COLUMNS

    const columns = {
      percent: 100,
      resizer: {
        inRealTime: true,
      },
      data: {
        [GSTC.api.GSTCID('label')]: {
          id: GSTC.api.GSTCID('label'),
          data: 'label',
          expander: true,
          isHtml: true,
          width: 100,
          minWidth: 100,
          header: {
            content: 'Staff',
          },
        },
      },
    };

    return {
      licenseKey:'====BEGIN LICENSE KEY====\nCidanOdbWqN0bCDefeHaNOXkF9beUnVTdXb8/h2uZY0Yc/hJBzMfa9NQ7FbZ36osPDlTtJA61trvqAH+gTHMF1oiUSyrMRjh+wPkQB0AdU8SuagIgPVw1mB2wBrqZSxjXr0scBf2ObXC1T1YDBp7rm1TEha8+HbJRE5nEIyngPX1MpMNtP6vkydXBADHiC7hYaCJ2syed5kRqEx5bkbjsr98DZFF9d2jfC94BNxyXsI+HS0p9RJg1O8y1lHBFrPbDMMcAbvNxW9BO1MkDnl/q84mOrD/wcbd1F4ep/Nzi9m8PVeq5kIeIcZFriHQsNCa8T7ffA9aUN24yv2Tfm12XA==||U2FsdGVkX1/437NxYm36Vm34r1IULz9PWCyGmgwYoxQGYaRaHTrGin7Fw0xocNdxyczCD9S068bWfi++1nYzSeWwepltxqrAg0k0xAlFxVo=\nJSBVBnnwQaW2W9tR416AySg9OnCBhvzEXAzr2le0QPRG2a0wIYo/S30NHqrXEXYwxgbB2+iLa+yXxirQ1wMXQ14QoGn/gIDQMZYqsNa3W4F2aO8HniuK2hK8EfMG0mnEew3M+ZJKhe3p0s6ytnyDHiGyOLX8DyFh2ywyipU4ROQHwCFSR6DI6W7gRVOIiBu4HSKzdJTlzN7fNNwxnJK3nGHS3wPE4EJtDo+u69ZR2trIaUVAjjN+1TzGksdviQTJuUi24+BeoDX8jrEVuQwa79bk0Pw1pyM9Y4GdZqaucvmMMnQuOIv7LlaO2cgwkwyCGoOHnRD9pUyWg+yqAGA+KQ==\n====END LICENSE KEY====',
      list: {
        rows,
        columns,
      },
      chart: {
        items,
      },
      plugins: [TimelinePointer(), Selection()],
    };
  }

  ngOnInit(): void {
    const state = GSTC.api.stateFromConfig(this.generateConfig());
  //  globalThis.state = state;
    this.gstc = GSTC({
      element: this.gstcElement.nativeElement,
      state,
    });
    this.scrollToCurrentTime();
 //   globalThis.gstc = this.gstc;
 setInterval(()=>{
   this.ngOnInit()
 },10000)
  }

  updateFirstItem(): void {
    this.gstc.state.update(
      `config.chart.items.${GSTC.api.GSTCID('0')}`,
      (item: { label: string; }) => {
        item.label = 'Dynamically updated!';
        return item;
      }
    );
  }

  updateFirstRow(): void {
    this.gstc.state.update(
      `config.list.rows.${GSTC.api.GSTCID('0')}`,
      (row: { label: string; }) => {
        row.label = 'Dynamically updated!';
        return row;
      }
    );
  }

  scrollToCurrentTime(): void {
    this.gstc.api.scrollToTime(GSTC.api.date().valueOf());
  }

  clearSelection(): void {
    this.gstc.api.plugins.selection.selectCells([]);
    this.gstc.api.plugins.selection.selectItems([]);
  }
}
