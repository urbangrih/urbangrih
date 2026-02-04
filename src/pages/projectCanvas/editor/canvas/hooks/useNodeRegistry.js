import { useCallback, useRef } from "react";

export function useNodeRegistry(){
    const nodesRef = useRef(new Map());

    const setNode = useCallback((id, node) => {
        if (node) nodesRef.current.set(id, node);
        else nodesRef.current.delete(id);
    }, []);

    const getRefSetter = useCallback(
        (id) => (node) => setNode(id, node),
    [setNode]);

    return {
        nodesRef: nodesRef, 
        getRefSetter,
    }
}