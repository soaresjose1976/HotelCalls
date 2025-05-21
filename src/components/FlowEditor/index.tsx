// Update the nodeTypes object in FlowEditor/index.tsx
import React from 'react';
import HotelActionNode from './HotelActionNode';

const nodeTypes = {
  message: MessageNode,
  decision: DecisionNode,
  action: ActionNode,
  hotelAction: HotelActionNode,
};
