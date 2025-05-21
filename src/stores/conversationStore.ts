import create from 'zustand';
import { Node, Edge } from 'reactflow';

interface ConversationStore {
  conversations: any[];
  currentConversation: any | null;
  fetchConversations: () => Promise<void>;
  setCurrentConversation: (conversation: any | null) => void;
  loadFlow: (flow: { nodes: Node[]; edges: Edge[] }) => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  currentConversation: null,
  fetchConversations: async () => {
    // Implement fetch logic
  },
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  loadFlow: (flow) => {
    const { currentConversation } = get();
    if (currentConversation) {
      set({
        currentConversation: {
          ...currentConversation,
          flow: {
            nodes: flow.nodes,
            edges: flow.edges
          }
        }
      });
    }
  }
}));
