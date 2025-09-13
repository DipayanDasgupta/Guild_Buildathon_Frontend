"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from "@/components/sidebar";
import { ClientForm } from '@/components/ClientForm';

// ... (ClientData interface remains the same) ...

function OnboardingForm() {
  const [initialData, setInitialData] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setInitialData(decodedData);
      } catch (e) { setInitialData({}); }
    } else {
      setInitialData({}); // Start with a blank form if no data
    }
  }, [searchParams]);

  const handleSuccess = () => {
    alert("Client profile created successfully!");
    router.push('/clients'); // Redirect to the main clients page
  };

  if (initialData === null) {
    return <p>Loading onboarding form...</p>;
  }

  return <ClientForm initialData={initialData} onSuccess={handleSuccess} />;
}

export default function OnboardingPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header"><h1>New Client Onboarding</h1></div>
        <div className="card">
          <Suspense fallback={<p>Loading...</p>}>
            <OnboardingForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
