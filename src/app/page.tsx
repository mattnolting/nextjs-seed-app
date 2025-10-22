import ComponentDemo from '../components/layout/ComponentDemo';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PatternFly Next.js Starter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern Next.js application with PatternFly components
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Schema Extraction</h2>
              <p className="text-gray-600">
                Extract component schemas from PatternFly React components
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Component Generation</h2>
              <p className="text-gray-600">
                Generate production-ready Next.js components
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Template Engine</h2>
              <p className="text-gray-600">
                Create comprehensive component templates
              </p>
            </div>
          </div>
        </div>

        {/* Component Demo Section */}
        <ComponentDemo />
      </div>
    </main>
  );
}
