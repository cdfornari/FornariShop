import { Grid } from '@mui/material';
import { AttachMoneyOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import useSWR from 'swr';
import { SummaryTile } from '../../components/admin';
import { DashboardLayout } from '../../components/layouts';
import { DashboardSummaryResponse } from '../../interfaces';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
    const {data,error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30000 // 30 seconds
    });
    
    const [refreshTime, setRefreshTime] = useState(30);
    useEffect(() => {
      const interval = setInterval(() => {
        setRefreshTime(refreshTime => refreshTime > 0 ? refreshTime - 1 : 30);
      }, 1000);
      return () => clearInterval(interval);
    }, [])
    
    if(!data && !error){
        return (
            <DashboardLayout 
                title='Loading' 
                subtitle='Dashboard is loading'
            >
                <FullScreenLoading />
            </DashboardLayout>
        )
    }
    if(error){
        console.log(error)
        return <h1>Error loading</h1>
    }
    const {
        numberOfClients,
        numberOfOrders,
        numberOfProducts,
        paidOrders,
        pendingOrders,
        productsLowStock,
        productsOutOfStock
    } = data!;
    return (
        <DashboardLayout
            title='Dashboard'
            subtitle='General Overview'
            icon={<DashboardOutlined/>}
        >
            <Grid container spacing={2} className='fadeIn'>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={numberOfOrders}
                        subtitle={'Total Orders'}
                        icon={<CreditCardOffOutlined color='secondary' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={paidOrders}
                        subtitle={'Paid Orders'}
                        icon={<AttachMoneyOutlined color='success' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={pendingOrders}
                        subtitle={'Pending Orders'}
                        icon={<CreditCardOffOutlined color='error' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={numberOfClients}
                        subtitle={'Clients'}
                        icon={<GroupOutlined color='primary' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={numberOfProducts}
                        subtitle={'Products'}
                        icon={<CategoryOutlined color='primary' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={productsOutOfStock}
                        subtitle={'Out of Stock'}
                        icon={<CancelPresentationOutlined color='error' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={productsLowStock}
                        subtitle={'Low Stock'}
                        icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize: 40}}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <SummaryTile
                        title={refreshTime}
                        subtitle={'Update timeout'}
                        icon={<AccessTimeOutlined color='secondary' sx={{fontSize: 40}}/>}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default DashboardPage