"use client";

import { useState } from 'react';
import { Button, Alert } from './ui';

export default function ComponentDemo() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'warning' | 'info'>('success');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Component Demo</h2>
        <p className="text-gray-600 mb-6">
          Interactive demonstration of generated PatternFly components
        </p>
      </div>

      {/* Button Demo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Button Component</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => setShowAlert(true)}>
            Primary Button
          </Button>
          <Button variant="secondary" onClick={() => setAlertVariant('warning')}>
            Secondary Button
          </Button>
          <Button variant="tertiary" onClick={() => setAlertVariant('danger')}>
            Tertiary Button
          </Button>
          <Button variant="danger" onClick={() => setAlertVariant('info')}>
            Danger Button
          </Button>
        </div>
      </div>

      {/* Alert Demo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Alert Component</h3>
        <div className="space-y-4">
          <Button 
            variant="primary" 
            onClick={() => {
              setShowAlert(true);
              setAlertVariant('success');
            }}
          >
            Show Success Alert
          </Button>
          
          {showAlert && (
            <Alert
              variant={alertVariant}
              title={`${alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)} Alert`}
              onClose={() => setShowAlert(false)}
            >
              This is a {alertVariant} alert generated from PatternFly components!
            </Alert>
          )}
        </div>
      </div>

      {/* Component Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Generated Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Button Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Multiple variants (primary, secondary, tertiary, danger)</li>
              <li>• Size options (small, medium, large)</li>
              <li>• Loading states and spinners</li>
              <li>• Accessibility support (OUIA props)</li>
              <li>• TypeScript definitions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Alert Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Multiple variants (success, danger, warning, info)</li>
              <li>• Dismissible alerts</li>
              <li>• Custom titles and content</li>
              <li>• Accessibility support</li>
              <li>• TypeScript definitions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
