"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from "@/components/sidebar";
import { ClientForm } from '@/components/ClientForm';

interface ClientData {
  name?: string; dob?: string; gender?: string; email?: string;
  phone?: string; address?: string; aadhaarNumber?: string; panNumber?: string;
  policyId?: string; policyType?: string; premiumAmount?: number;
  premiumFrequency?: string; expirationDate?: string; dueDate?: string;
}

// This new component contains all the logic that uses useSearchParams
function OnboardingForm() {
  const [initialData, setInitialData] = useState<ClientData | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setInitialData(decodedData);
      } catch (e) { console.error("Failed to parse initial data", e); }
    } else {
      // If no data is passed, start with a blank form
      setInitialData({});
    }
  }, [searchParams]);

  const handleFormSubmit = async (formData: ClientData) => {
    alert("Client data would be saved to the database now.");
    console.log("Submitting form data:", formData);
    router.push('/clients');
  };

  if (initialData === null) {
    // Show a loading state while we parse the URL
    return <p>Loading onboarding form...</p>;
  }

  return <ClientForm initialData={initialData} onSubmit={handleFormSubmit} />;
}


// The main page component is now cleaner
export default function OnboardingPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>New Client Onboarding</h1>
        </div>
        <div className="card">
          {/* This is the crucial fix: wrapping the component in Suspense */}
          <Suspense fallback={<p>Loading...</p>}>
            <OnboardingForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
