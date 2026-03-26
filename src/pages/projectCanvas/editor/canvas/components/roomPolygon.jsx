import { Group, Layer, Line, Text } from "react-konva";

export function roomPolygon({ properties, events }) {
    return (
        <Group
            {...properties.group}
            {...events}
        >
            <Line
                {...properties.line}
            ></Line>
            <Text
                {...properties.text}
            />
        </Group>
    );
}
