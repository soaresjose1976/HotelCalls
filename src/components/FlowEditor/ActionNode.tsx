import React from 'react';
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function ActionNode({ data, isConnectable }: NodeProps) {
  return (
    <div className="bg-white border-2 border-purple-500 rounded-lg p-4 min-w-[200px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="font-bold text-sm mb-2">Action</div>
      <select
        value={data.actionType}
        onChange={(e) => data.onActionTypeChange?.(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="collect_input">Collect Input</option>
        <option value="api_call">API Call</option>
        <option value="transfer">Transfer Call</option>
      </select>
      <input
        value={data.content}
        onChange={(e) => data.onChange?.(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Action parameters..."
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}

export default memo(ActionNode);
