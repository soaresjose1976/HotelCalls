import React from 'react';
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function HotelActionNode({ data, isConnectable }: NodeProps) {
  return (
    <div className="bg-white border-2 border-indigo-500 rounded-lg p-4 min-w-[250px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="font-bold text-sm mb-2">Hotel Action</div>
      <select
        value={data.actionType}
        onChange={(e) => data.onActionTypeChange?.(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="check_availability">Check Room Availability</option>
        <option value="make_reservation">Make Reservation</option>
        <option value="room_service">Room Service Request</option>
        <option value="housekeeping">Housekeeping Request</option>
        <option value="concierge">Concierge Service</option>
        <option value="wake_up_call">Schedule Wake-up Call</option>
        <option value="extend_stay">Extend Stay</option>
        <option value="early_checkout">Early Checkout</option>
      </select>
      <textarea
        value={data.parameters}
        onChange={(e) => data.onParametersChange?.(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Action parameters (JSON)"
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}

export default memo(HotelActionNode);
