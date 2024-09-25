import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-jplenio-1103970.jpg&fm=jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            {/* Custom Logo */}
            <div className="flex items-center">
              <span className="text-3xl font-bold text-blue-500">Formify</span>
              <span className="text-3xl font-bold text-yellow-500 ml-1">AI</span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Formify AI 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Easily create, customize, and share AI-generated forms in seconds. With our powerful analytics and real-time insights, you can make informed decisions effortlessly.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-500">Formify</span>
                <span className="text-3xl font-bold text-yellow-500 ml-1">AI</span>
              </div>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Formify AI 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Create professional forms instantly with AI assistance. Start sharing your forms and gathering data effortlessly, powered by our intuitive platform.
              </p>
            </div>

            <SignIn path="/sign-in" />
          </div>
        </main>
      </div>
    </section>
  );
}
