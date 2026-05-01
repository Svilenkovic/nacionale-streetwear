"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts, useCollections } from '@/hooks/useProducts';
import ProductCard from '@/components/ui/ProductCard';
import ScrollReveal from '@/components/animations/ScrollReveal';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const { collections, isLoading: collectionsLoading } = useCollections(slug || undefined);
  const { products, isLoading: productsLoading } = useProducts(slug || undefined);

  const activeCollection = slug ? collections?.find(c => c.slug === slug) : null;
  const title = activeCollection ? activeCollection.name : "Sve forme";
  const desc = activeCollection ? activeCollection.description : "Pregled svih komada iz primarne edicije — vizuelna demonstracija kataloga.";

  const skeletons = Array(6).fill(0).map((_, i) => (
      <div key={i} className="aspect-[3/4] bg-surface-light rounded-xl animate-pulse border border-white/5 relative overflow-hidden" aria-hidden="true">
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface to-transparent opacity-50"></div>
      </div>
  ));

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up" className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wider mb-6 text-text-primary">
             {title}
          </h1>
          <p className="text-text-secondary text-base md:text-lg">
             {desc}
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
           <a href="/collections" className={`px-6 py-2 rounded-full font-heading text-sm uppercase tracking-widest transition-colors ${!slug ? 'bg-text-primary text-background' : 'glass text-text-secondary hover:text-primary'}`}>SVE</a>
           {collections?.map(c => (
             <a key={c.id} href={`/collections/?slug=${c.slug}`} className={`px-6 py-2 rounded-full font-heading text-sm uppercase tracking-widest transition-colors ${slug === c.slug ? 'bg-text-primary text-background' : 'glass text-text-secondary hover:text-primary'}`}>{c.name}</a>
           ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {productsLoading || collectionsLoading ? (
            skeletons
          ) : products?.length > 0 ? (
            products.map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={(index % 3) * 0.1}>
                <ProductCard product={product} index={index} />
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-32 text-center text-text-secondary border border-white/5 rounded-xl bg-surface-light/50 font-heading uppercase tracking-widest text-sm">
               Trenutno nema komada u ovoj edicji.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" role="status" aria-label="Učitavanje" /></div>}>
            <CollectionsContent />
        </Suspense>
    )
}
