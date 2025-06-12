

export function Newsletter() {
  return (
    <section className="w-full mb-12" suppressHydrationWarning>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
        <p className="mb-6">
          Get the latest updates on new products and upcoming sales.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4"
          suppressHydrationWarning
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 rounded px-3 py-2 text-black text-sm sm:text-base"
            suppressHydrationWarning
          />
          <Button
            type="submit"
            className="bg-white text-blue-600 hover:bg-blue-50"
            suppressHydrationWarning
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
