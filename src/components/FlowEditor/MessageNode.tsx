import React from 'react';
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function MessageNode({ data, isConnectable }: NodeProps) {
  return (
    <div className="bg-white border-2 border-blue-500 rounded-lg p-4 min-w-[200px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="font-bold text-sm mb-2">Message</div>
      <textarea
        value={data.content}
        onChange={(e) => data.onChange?.(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter message content..."
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}

export default memo(MessageNode);
