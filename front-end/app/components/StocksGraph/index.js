/**
 *
 * StocksGraph
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import * as d3fc from 'd3fc';

const useStyles = makeStyles(() => ({
  parentDiv: {
    margin: 'auto',
    textAlign: 'center'
  }
}));

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

function StocksGraph(props) {
  const { stockInfo } = props;
  const graphRef = React.useRef();

  const width = 500;
  const height = 500;

  const stockInfoValues = Object.values(stockInfo);

  const xScale = d3
    .scaleTime()
    .domain([
      new Date(Math.min(...stockInfoValues.map(o => o.fromDate)) * 1000),
      new Date(Math.max(...stockInfoValues.map(o => o.toDate)) * 1000)
    ])
    .range([0, width]);
  const skipWeekendScale = d3fc
    .scaleDiscontinuous(d3.scaleTime())
    .discontinuityProvider(d3fc.discontinuitySkipWeekends())
    .domain([
      new Date(Math.min(...stockInfoValues.map(o => o.fromDate)) * 1000),
      new Date(Math.max(...stockInfoValues.map(o => o.toDate)) * 1000)
    ])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...stockInfoValues.map(o => Math.max(...o.data)))])
    .range([height, 0]);

  const lineFunc = d3
    .line()
    .x(d => {
      const indexDate = new Date(d.date * 1000);
      return skipWeekendScale(indexDate);
    })
    .y(d => yScale(d.val));

  React.useEffect(() => {
    if (graphRef.current) {
      const svg = d3
        .select(graphRef.current)
        .attr('width', width + 200)
        .attr('height', height + 100)
        .append('g')
        .attr('transform', 'translate(50, 50)');

      svg
        .append('g')
        .attr('id', 'xAxis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(skipWeekendScale).ticks(2));

      svg
        .append('g')
        .attr('id', 'yAxis')
        .call(d3.axisLeft(yScale));
    }
  }, []);

  React.useEffect(() => {
    d3.select('#xAxis').call(d3.axisBottom(skipWeekendScale).ticks(2));
    d3.select('#yAxis').call(d3.axisLeft(yScale));
  }, [xScale, yScale]);

  React.useEffect(() => {
    Object.entries(stockInfo).forEach(([stockId, stockData], stockIdx) => {
      if (stockData.data.length > 0 && stockData.time.length > 0) {
        const formattedData = stockData.data.map((d, index) => ({
          val: d,
          date: stockData.time[index]
        }));
        const htmlStockId = stockId.replaceAll('-', '');
        const lineSelect = d3.select(`#${htmlStockId}`);
        if (lineSelect.empty()) {
          const svg = d3.select(graphRef.current);
          svg
            .append('path')
            .attr('id', htmlStockId)
            .attr('fill', 'none')
            .attr('stroke', colorScale(stockIdx % 10))
            .attr('stroke-width', 1.5)
            .attr('transform', 'translate(50, 0)')
            .attr('d', lineFunc(formattedData));

          svg
            .append('text')
            .attr(
              'transform',
              `translate(${skipWeekendScale(new Date(stockData.toDate * 1000)) +
                50}, ${yScale(formattedData[formattedData.length - 1].val)})`
            )
            .attr('text-anchor', 'start')
            .attr('id', `${htmlStockId}-text`)
            .style('fill', colorScale(stockIdx % 10))
            .text(stockData.symbol);
        } else {
          lineSelect.attr('d', lineFunc(formattedData));
          d3.select(`#${htmlStockId}-text`)
            .attr(
              'transform',
              `translate(${skipWeekendScale(new Date(stockData.toDate * 1000)) +
                50}, ${yScale(formattedData[formattedData.length - 1].val)})`
            )
            .text(stockData.symbol);
        }
      }
    });
  }, [stockInfo]);

  const classes = useStyles();

  return (
    <div className={classes.parentDiv}>
      <svg ref={graphRef} />
    </div>
  );
}

StocksGraph.propTypes = {
  stockInfo: PropTypes.object
};

export default memo(StocksGraph);
