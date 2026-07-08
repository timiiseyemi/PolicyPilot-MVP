import { Container } from "@/components/common/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Wallet, 
  RefreshCcw, 
  Sparkles, 
  Plus, 
  FileText,
  TrendingUp,
  Clock
} from "lucide-react";

export default function DashboardPage() {
  return (
    <Container className="py-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Broker Overview</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your brokerage performance summary at a glance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="rounded-full"><FileText className="w-4 h-4 mr-2" /> Export Report</Button>
          <Button size="lg" className="rounded-full shadow-primary/20 shadow-lg"><Plus className="w-4 h-4 mr-2" /> New Policy</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Premiums", value: "₦124.5M", icon: Wallet, gradient: "from-blue-600 to-cyan-500" },
          { title: "Active Policies", value: "842", icon: ShieldCheck, gradient: "from-indigo-600 to-purple-500" },
          { title: "Pending Renewals", value: "28", icon: RefreshCcw, gradient: "from-amber-500 to-orange-500" },
          { title: "AI Opportunities", value: "12", icon: Sparkles, gradient: "from-emerald-600 to-teal-500" },
        ].map((kpi, i) => (
          <div key={i} className={`bg-gradient-to-br ${kpi.gradient} p-6 rounded-3xl shadow-xl shadow-black/5 text-white transform transition-transform hover:scale-105`}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <kpi.icon className="w-7 h-7 text-white" />
              </div>
              <span className="flex items-center text-sm font-medium bg-white/20 px-2 py-1 rounded-md">
                +2.4% <ArrowUpRight className="w-4 h-4 ml-1" />
              </span>
            </div>
            <div className="text-4xl font-extrabold tracking-tight">{kpi.value}</div>
            <div className="text-white/80 mt-1 font-medium text-lg">{kpi.title}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Wide) */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-3xl border shadow-sm">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-xl">Performance Trends</CardTitle>
              <Button variant="ghost" size="sm">View Detailed Report</Button>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center border-2 border-dashed border-muted rounded-2xl bg-muted/20 text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="w-10 h-10 opacity-50" />
                <span>Chart visualization would be here</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Recent Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground p-6 bg-muted/20 rounded-2xl">
                Policy list component to be integrated...
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                <p className="text-sm text-foreground leading-relaxed">Suggest cross-selling motor insurance to John Doe based on home policy expiry.</p>
                <Button variant="link" size="sm" className="px-0 mt-2">View Customer</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4">
                    <div className="size-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium">New claim submitted by Jane Smith</p>
                      <p className="text-xs text-muted-foreground mt-0.5">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
