import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
import { useTheme } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

interface ServicesProps {}

const Services = (props: ServicesProps) => {
    const { colors } = useTheme();
    const { containerStyles } = useThemedStyles();

    const [search, setSearch] = React.useState('');
    const [data, setData] = React.useState([
        ['1', 'Service A', 'Active'],
        ['2', 'Service B', 'Inactive'],
        ['3', 'Service C', 'Active'],
        // Add more data as needed
    ]);

    const filteredData = data.filter(item => item[1].toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={[containerStyles.fullScreen, { backgroundColor: colors.background }]}>
            <Text style={styles.title}>Services</Text>
            
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={search}
                onChangeText={text => setSearch(text)}
            />
            
            <Table borderStyle={{ borderColor: colors.border,backgroundColor:'#fff' }}>
                <Row data={['ID', 'Name', 'Status']} style={styles.head} textStyle={styles.text}/>
                <Rows data={filteredData} textStyle={styles.text}/>
            </Table>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    head: {
        height: 50,
        backgroundColor: 'red',
    },
    text: {
        margin: 6,
        color: '#fff', // Ensure text color is set
    },
});

export default Services;
