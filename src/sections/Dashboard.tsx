import React from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  TrendingUp,
  Target
} from 'lucide-react';
import MetricCard from '../components/Dashboard/MetricCard';
import ChartCard from '../components/Dashboard/ChartCard';
import SalesChart from '../components/Charts/SalesChart';
import TopProductsChart from '../components/Charts/TopProductsChart';
import OrderStatusChart from '../components/Charts/OrderStatusChart';
import RevenueChart from '../components/Charts/RevenueChart';
import InventoryChart from '../components/Charts/InventoryChart';
import CustomerSegmentChart from '../components/Charts/CustomerSegmentChart';
import ConversionChart from '../components/Charts/ConversionChart';
import LowRotationChart from '../components/Charts/LowRotationChart';
import PromotionsChart from '../components/Charts/PromotionsChart';
import SalesChannelChart from '../components/Charts/SalesChannelChart';
import VariantPerformanceChart from '../components/Charts/VariantPerformanceChart';
import GeolocationChart from '../components/Charts/GeolocationChart';
import { mockMetrics } from '../services/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${mockMetrics.totalRevenue.toLocaleString()}`}
          change={12.5}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Total Orders"
          value={mockMetrics.totalOrders}
          change={8.2}
          icon={ShoppingCart}
          color="blue"
        />
        <MetricCard
          title="Products"
          value={mockMetrics.totalProducts}
          change={-2.1}
          icon={Package}
          color="purple"
        />
        <MetricCard
          title="Customers"
          value={mockMetrics.totalCustomers}
          change={15.3}
          icon={Users}
          color="yellow"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${mockMetrics.conversionRate}%`}
          change={5.7}
          icon={Target}
          color="green"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${mockMetrics.averageOrderValue}`}
          change={3.1}
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Row 1 */}
        <ChartCard title="Daily Sales Trend">
          <SalesChart />
        </ChartCard>
        <ChartCard title="Top Selling Products">
          <TopProductsChart />
        </ChartCard>
        <ChartCard title="Order Status Distribution">
          <OrderStatusChart />
        </ChartCard>

        {/* Row 2 */}
        <ChartCard title="Revenue vs Costs" height="h-96">
          <RevenueChart />
        </ChartCard>
        <ChartCard title="Inventory Status by Category">
          <InventoryChart />
        </ChartCard>
        <ChartCard title="Customer Segments">
          <CustomerSegmentChart />
        </ChartCard>

        {/* Row 3 */}
        <ChartCard title="Conversion & Cart Abandonment">
          <ConversionChart />
        </ChartCard>
        <ChartCard title="Low Rotation Products">
          <LowRotationChart />
        </ChartCard>
        <ChartCard title="Promotion Performance">
          <PromotionsChart />
        </ChartCard>

        {/* Row 4 */}
        <ChartCard title="Sales by Channel">
          <SalesChannelChart />
        </ChartCard>
        <ChartCard title="Variant Performance">
          <VariantPerformanceChart />
        </ChartCard>
        <ChartCard title="Sales by Location">
          <GeolocationChart />
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New order #ORD-1234 received</span>
            </div>
            <span className="text-xs text-gray-500">2 min ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Product "Smart Watch Pro" low stock alert</span>
            </div>
            <span className="text-xs text-gray-500">15 min ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Customer support ticket #T-567 pending</span>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;