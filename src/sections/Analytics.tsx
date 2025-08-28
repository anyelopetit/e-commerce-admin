import React from 'react';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';
import ChartCard from '../components/Dashboard/ChartCard';
import MetricCard from '../components/Dashboard/MetricCard';
import ConversionChart from '../components/Charts/ConversionChart';
import LowRotationChart from '../components/Charts/LowRotationChart';
import PromotionsChart from '../components/Charts/PromotionsChart';
import SalesChannelChart from '../components/Charts/SalesChannelChart';
import VariantPerformanceChart from '../components/Charts/VariantPerformanceChart';
import GeolocationChart from '../components/Charts/GeolocationChart';
import CustomerSegmentChart from '../components/Charts/CustomerSegmentChart';
import RevenueChart from '../components/Charts/RevenueChart';

const Analytics: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue Growth"
          value="+18.2%"
          change={5.2}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Customer Acquisition"
          value="156"
          change={12.1}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Product Performance"
          value="4.2/5"
          change={3.5}
          icon={Package}
          color="purple"
        />
        <MetricCard
          title="Market Share"
          value="23.4%"
          change={2.8}
          icon={BarChart3}
          color="yellow"
        />
      </div>

      {/* Advanced Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Costs Analysis" height="h-80">
          <RevenueChart />
        </ChartCard>
        <ChartCard title="Customer Segmentation" height="h-80">
          <CustomerSegmentChart />
        </ChartCard>
        
        <ChartCard title="Conversion Rate & Cart Abandonment" height="h-80">
          <ConversionChart />
        </ChartCard>
        <ChartCard title="Sales Channel Performance" height="h-80">
          <SalesChannelChart />
        </ChartCard>
        
        <ChartCard title="Product Variant Comparison" height="h-80">
          <VariantPerformanceChart />
        </ChartCard>
        <ChartCard title="Geographic Sales Distribution" height="h-80">
          <GeolocationChart />
        </ChartCard>
        
        <ChartCard title="Low Rotation Products Alert" height="h-80">
          <LowRotationChart />
        </ChartCard>
        <ChartCard title="Promotion Campaign Analysis" height="h-80">
          <PromotionsChart />
        </ChartCard>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Categories</h3>
          <div className="space-y-3">
            {[
              { category: 'Electronics', revenue: 45600, growth: 12.5 },
              { category: 'Audio', revenue: 32100, growth: 8.2 },
              { category: 'Computers', revenue: 28900, growth: -2.1 },
              { category: 'Gaming', revenue: 19800, growth: 15.7 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.category}</p>
                  <p className="text-sm text-gray-600">${item.revenue.toLocaleString()} revenue</p>
                </div>
                <span className={`text-sm font-medium ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.growth >= 0 ? '+' : ''}{item.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Lifetime Value</h3>
          <div className="space-y-3">
            {[
              { segment: 'VIP Customers', count: 23, ltv: 2840 },
              { segment: 'Regular Customers', count: 156, ltv: 1250 },
              { segment: 'New Customers', count: 89, ltv: 340 },
              { segment: 'At-Risk Customers', count: 34, ltv: 890 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.segment}</p>
                  <p className="text-sm text-gray-600">{item.count} customers</p>
                </div>
                <span className="text-lg font-bold text-blue-600">${item.ltv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;