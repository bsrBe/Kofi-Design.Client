import { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Navigation';
import { Hero } from './components/Home';
import { OrderFlow } from './components/OrderFlow';
import { MyOrders } from './components/MyOrders';
import { OrderDetails } from './components/OrderDetails';
import { Collections } from './components/Collections';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'order-flow' | 'my-orders' | 'order-details' | 'collections' | 'admin'>('home');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // Initialize Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();

      // Redirect to bot if initData is missing (ensures /start flow)
      if (!tg.initData) {
        window.location.href = 'https://t.me/kofiDesign_bot?start=app';
        return;
      }
    }

    // Handle deep linking from Telegram
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'my-orders') setCurrentView('my-orders');
    if (view === 'collections') setCurrentView('collections');
    if (view === 'home') setCurrentView('home');
  }, []);

  const handleStartOrder = (collectionId?: string) => {
    setSelectedCollectionId(collectionId || null);
    setCurrentView('order-flow');
  };
  const handleGoHome = () => setCurrentView('home');
  const handleGoToMyOrders = () => setCurrentView('my-orders');
  const handleGoToCollections = () => setCurrentView('collections');
  const handleViewOrderDetails = (id: string) => {
    setSelectedOrderId(id);
    setCurrentView('order-details');
  };
  const handleEditOrder = (order: any) => {
    setEditingOrder(order);
    setCurrentView('order-flow');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background-light dark:bg-background-dark transition-colors duration-500 relative overflow-hidden">
      {/* Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
        <div className="ambient-blob bg-primary w-[500px] h-[500px] -top-48 -left-48" />
        <div className="ambient-blob bg-accent-gold w-[400px] h-[400px] top-1/2 -right-24 opacity-10" />
        <div className="ambient-blob bg-red-600 w-[600px] h-[600px] -bottom-48 left-1/2 -translate-x-1/2 opacity-5" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar
          onStartOrder={handleStartOrder}
          onHome={handleGoHome}
          onMyOrders={handleGoToMyOrders}
          onCollections={handleGoToCollections}
          currentView={currentView}
        />
        <main className="w-full flex flex-col items-center">
          {currentView === 'order-flow' ? (
            <div className="w-full bg-slate-900 dark:bg-background-dark py-10">
              <OrderFlow
                onBack={() => {
                  setSelectedCollectionId(null);
                  setEditingOrder(null);
                  handleGoHome();
                }}
                collectionId={selectedCollectionId}
                editOrder={editingOrder}
              />
            </div>
          ) : currentView === 'my-orders' ? (
            <div className="w-full bg-background-light dark:bg-background-dark min-h-[80vh]">
              <MyOrders onViewOrder={handleViewOrderDetails} />
            </div>
          ) : currentView === 'order-details' ? (
            <div className="w-full bg-background-light dark:bg-background-dark min-h-[80vh]">
              <OrderDetails
                orderId={selectedOrderId || ''}
                onBack={handleGoToMyOrders}
                onEdit={handleEditOrder}
              />
            </div>
          ) : currentView === 'collections' ? (
            <div className="w-full bg-background-light dark:bg-background-dark min-h-[80vh]">
              <Collections onStartOrder={handleStartOrder} />
            </div>
          ) : (
            <>
              <Hero onStartOrder={handleStartOrder} />
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
