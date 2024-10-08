import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import CustomButton from './CustomButton';
import { useTheme } from '@react-navigation/native';

interface TableRowProps {
  data: string[];
  background?: string;
  color?: string;
  cellWidth: number; // Added cellWidth prop
  onButtonPress: (...args: any[]) => void; // Accepts any number of parameters of any type
}

const TableRow: React.FC<TableRowProps> = React.memo(({ data, background, color, cellWidth, onButtonPress }) => {
  const { colors } = useTheme();

  const renderCellContent = (cell: string) => {
    let content;

    try {
      const parsed = JSON.parse(cell);

      if (typeof parsed === 'object' && parsed !== null) {
        content = <CustomButton name={parsed.buttonText} onPress={() => onButtonPress(parsed.parameters, parsed.buttonText)} />;
      } else {
        content = <Text style={[styles.cellText, { color }]}>{cell}</Text>;
      }
    } catch (error) {
      content = <Text style={[styles.cellText, { color }]}>{cell}</Text>;
    }

    return content;
  };

  return (
    <View style={[styles.row, { backgroundColor: background }]}>
      {data.map((cell, index) => (
        <View key={index} style={[styles.cell, { width: cellWidth, borderColor: colors.primary }]}>
          {renderCellContent(cell)}
        </View>
      ))}
    </View>
  );
});

interface CustomTableProps {
  columns: string[];
  data: string[][];
  onButtonPress: (...args: any[]) => void; // Accepts any number of parameters of any type
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, onButtonPress }) => {
  const { colors } = useTheme();

  const columnHeaders = useMemo(() => columns.map((col) => col), [columns]);

  const cellWidth = 120;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Render the column headers */}
          <TableRow
            data={columnHeaders}
            background={colors.primary}
            color={colors.background}
            cellWidth={cellWidth}
            onButtonPress={onButtonPress}
          />

          {/* Check if data is empty and render "No records" row */}
          {data.length === 0 ? (
            <View style={styles.row}>
              <View
                style={[
                  styles.cell,
                  {
                    width: cellWidth * columns.length, // Span across all columns
                    justifyContent: 'center',
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Text style={[styles.cellText, { color: colors.text }]}>No records available</Text>
              </View>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TableRow
                  data={item}
                  onButtonPress={onButtonPress}
                  color={colors.text}
                  background={colors.background}
                  cellWidth={cellWidth}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cellText: {
    fontSize: 16,
  },
});

export default CustomTable;
