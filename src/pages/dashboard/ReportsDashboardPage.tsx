import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { FileText, Download, BarChart2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function ReportsDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports</h1>
          <p className="text-slate-500">Access and generate system reports.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="h-4 w-4 mr-2" /> Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-emerald-600" /> Allocation Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">Detailed breakdown of property allocations by region and estate.</p>
            <Button variant="outline" className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" /> Revenue Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">Financial summaries and revenue generated across all states.</p>
            <Button variant="outline" className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
