import React from 'react';
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function DecisionNode({ data, isConnectable }: NodeProps) {
  return (
    <div className="bg-white border-2 border-green-500 rounded-lg p-4 min-w-[200px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="font-bold text-sm mb-2">Decision</div>
      <input
        value={data.content}
        onChange={(e) => data.onChange?.(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter decision question..."
      />
      <div className="space-y-2">
        {data.options?.map((option: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              value={option}
              onChange={(e) => {
                const newOptions = [...data.options];
                newOptions[index] = e.target.value;
                data.onOptionsChange?.(newOptions);
              }}
              className="flex-1 p-2 border rounded"
              placeholder={`Option ${index + 1}`}
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id={`option-${index}`}
              isConnectable={isConnectable}
              style={{ left: `${((index + 1) / (data.options.length + 1)) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(DecisionNode);
