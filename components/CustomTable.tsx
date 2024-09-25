import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Button from './Button';

interface TableRowProps {
  data: string[];
  background?: string;
  color?: string;
  onButtonPress: (value: any) => void;
}

const TableRow: React.FC<TableRowProps> = React.memo(({ data, background, color, onButtonPress }) => {

  // Memoize the rendering of cell content to avoid unnecessary re-rendering
  const renderCellContent = (cell: string) => {
    let content;

    try {
      const parsed = JSON.parse(cell);

      // Check if the parsed value is an object
      if (typeof parsed === 'object' && parsed !== null) {
        content = <Button name='View' onPress={() => onButtonPress(parsed.parameters)} />;
      } else {
        content = <Text style={[styles.cellText, { color }]}>{cell}</Text>;
      }
    } catch (error) {
      // Fallback to rendering the cell as plain text if parsing fails
      content = <Text style={[styles.cellText, { color }]}>{cell}</Text>;
    }

    return content;
  };

  return (
    <View style={[styles.row, { backgroundColor: background }]}>
      {data.map((cell, index) => (
        <View key={index} style={styles.cell}>
          {renderCellContent(cell)}
        </View>
      ))}
    </View>
  );
});

interface Column {
  title: string;
}

interface CustomTableProps {
  columns: Column[];
  data: string[][];
  onButtonPress: (value: any) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, onButtonPress }) => {
  const { colors } = useTheme();

  // Memoize the column headers to avoid re-rendering
  const columnHeaders = useMemo(() => columns.map((col) => col.title), [columns]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Render the column headers */}
      <TableRow data={columnHeaders} background={colors.primary} color={colors.background} onButtonPress={onButtonPress} />
      
      {/* Render the table data */}
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TableRow 
            data={item} 
            onButtonPress={onButtonPress} 
            color={colors.text} 
            background={colors.background}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '110%', // Fixing width to 100%
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  cellText: {
    fontSize: 16,
  },
});

export default CustomTable;
