import * as React from 'react';
import { createRoot } from 'react-dom/client';
import RuralTelemedicineApp from './RuralTelemedicineApp.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <RuralTelemedicineApp />
    </React.StrictMode>
  );
}
