import React, { Component, RefObject } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

interface ChartProps {
  nodes: any[];
}

export default class Chart extends Component<ChartProps> {
  private divRef: RefObject<HTMLDivElement>;
  private family: FamilyTree | null;

  constructor(props: ChartProps) {
    super(props);
    this.divRef = React.createRef();
    this.family = null;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.family = new FamilyTree(this.divRef.current!, {
      nodes: this.props.nodes,
      nodeBinding: {
        field_0: 'name',
        img_0: 'img',
      },
    });
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>;
  }
}