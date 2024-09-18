import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useThemedStyles } from '../styles/styles';
type Column = {
  title: string;
};

type Data = any[][];

type DynamicTableProps = {
  columns: Column[];
  data: Data;
  onButtonPress: (action: string) => void;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, onButtonPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {tableStyles} = useThemedStyles();

  const filteredData = data.filter(row => 
    row.some(cell => cell.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortAscending) {
      return a[0] > b[0] ? 1 : -1;
    } else {
      return a[0] < b[0] ? 1 : -1;
    }
  });

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleButtonPress = (action: string) => {
    onButtonPress(action);
  };

  const renderHeader = () => (
    <View style={tableStyles.header}>
      {columns.map((col, index) => (
        <Text key={index} style={tableStyles.headerText}>{col.title}</Text>
      ))}
    </View>
  );

  const renderRow = ({ item }: { item: any[] }) => (
    <View style={tableStyles.row}>
      {item.map((cell, index) => {
        if (typeof cell === 'string' && cell.includes('<button')) {
            const matches = cell.match(/onclick=(\w+)\(([^)]+)\)/);
            if (matches) {
              const params = matches[2].split(',').map(param => param.trim().replace(/['"]/g, ''));
              return (
                <TouchableOpacity
                  key={index}
                  style={tableStyles.button}
                  onPress={() => handleButtonPress(params.toString())}
                >
                  <Text style={tableStyles.buttonText}>View</Text>
                </TouchableOpacity>
              );
            }
        }
        return <Text key={index} style={tableStyles.cell}>{cell}</Text>;
      })}
    </View>
  );

  return (
    <View style={tableStyles.container}>
      <TextInput
        placeholder="Search..."
        style={tableStyles.searchInput}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {renderHeader()}
      <FlatList
        data={paginatedData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={tableStyles.footer}>
            <TouchableOpacity
              onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <Text>Previous</Text>
            </TouchableOpacity>
            <Text>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</Text>
            <TouchableOpacity
              onPress={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default DynamicTable;
