import React from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import "./plane.scss";

const Plane = ({ data }) => {
  return (
    <React.Fragment>
      <ForceGraph2D
        graphData={{
          nodes: data.nodes,
          links: data.bars.map((item) => {
            let bar = item;
            bar.nodeI = item.nodeI._id;
            bar.nodeJ = item.nodeJ._id;
            return bar;
          }),
        }}
        backgroundColor="beige"
        width={1000}
        height={700}
        nodeId="_id"
        nodeVal="xForce"
        linkTarget="nodeI"
        linkSource="nodeJ"
        linkColor="black"
        linkWidth={10}
        enableNodeDrag={false}
        showNavInfo={true}
      />
    </React.Fragment>
  );
};

export default Plane;
