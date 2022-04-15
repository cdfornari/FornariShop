import { Grid, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { PeopleOutline } from '@mui/icons-material'
import { DashboardLayout } from '../../components/layouts'
import { FullScreenLoading } from '../../components/ui';
import { iUser } from '../../interfaces';
import { api } from '../../api';
import { useState, useEffect } from 'react';


const UsersPage = () => {
    const {data,error} = useSWR<iUser[]>('/api/admin/users');
    const [users, setUsers] = useState<iUser[]>([]);
    useEffect(() => {
        if(data) setUsers(data);
    }, [data]);

    if(!data && !error){
        return (
            <DashboardLayout 
                title='Loading' 
                subtitle='Table is loading'
            >
                <FullScreenLoading />
            </DashboardLayout>
        )
    }
    const onRoleUpdate = async(userId: string, role: 'admin' | 'client') => {
        const previousUsers = [...users];
        const updatedUsers = users.map(user => user._id === userId ? {...user, role} : user);
        setUsers(updatedUsers);
        try {
            await api.put('/admin/users', {userId, role})
        } catch (error) {
            setUsers(previousUsers);
            console.log(error);
            alert('Error updating role')
        }
    }
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'name', headerName: 'Name', width: 300 },
        { 
            field: 'role', 
            headerName: 'Role', 
            width: 250,
            renderCell: ({row}: GridValueGetterParams) => (
                <Select
                    value={row.role}
                    label='Role'
                    sx={{width: '300px'}}
                    onChange={({target}) => onRoleUpdate(row.id, target.value)}
                >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='client'>Client</MenuItem>
                </Select>
            )
        }
    ]
    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))
    return (
        <DashboardLayout
            title=" Users"
            subtitle="Users management"
            icon={ <PeopleOutline /> }
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}
export default UsersPage