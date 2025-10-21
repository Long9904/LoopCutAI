import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { TangibleInput } from '@/components/ui/tangible-input';
import { TagInput } from '@/components/ui/tag-input';
import { Plus, Search, Calendar, DollarSign, Tag } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { AddSubscriptionDialog } from './AddSubscriptionDialog';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export const SubscriptionsPage = () => {
  const { subscriptions, currentProfile, deleteSubscription } = useAppStore();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTags, setEditingTags] = useState<string | null>(null);
  const [tags, setTags] = useState<Record<string, string[]>>({});

  const filteredSubscriptions = subscriptions
    .filter((sub) => currentProfile.subscriptions.includes(sub.id))
    .filter((sub) => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const categories = ['all', 'entertainment', 'productivity', 'software', 'fitness', 'education'];

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleDeleteSubscription = (id: string, name: string) => {
    deleteSubscription(id);
    const index = currentProfile.subscriptions.indexOf(id);
    if (index > -1) {
      currentProfile.subscriptions.splice(index, 1);
    }
    toast.success(`${t('deleted')} ${name}`);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          {t('manageSubscriptions')}
        </p>
        <TangibleButton size="lg" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-5 w-5" />
          {t('addSubscription')}
        </TangibleButton>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <TangibleInput
            placeholder={t('searchSubscriptions')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <TangibleButton
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize whitespace-nowrap"
            >
              {t(category)}
            </TangibleButton>
          ))}
        </div>
      </motion.div>

      {/* Subscriptions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredSubscriptions.map((sub, index) => (
            <motion.div
              key={sub.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <TangibleCard color={sub.color}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{sub.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground capitalize">
                      {sub.category}
                    </p>
                  </div>
                  <div className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {getDaysUntil(sub.nextBillDate)}d
                  </div>
                </div>

                <p className="mt-4 text-sm">{sub.description}</p>

                {/* Tags Section */}
                <div className="mt-4">
                  {editingTags === sub.id ? (
                    <TagInput
                      tags={tags[sub.id] || []}
                      onTagsChange={(newTags) => {
                        setTags({ ...tags, [sub.id]: newTags });
                      }}
                      placeholder={t('addTags')}
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 min-h-[32px] items-center">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {(tags[sub.id] || []).length > 0 ? (
                        <>
                          {tags[sub.id].slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags[sub.id].length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{tags[sub.id].length - 3} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">{t('noTags')}</span>
                      )}
                      <TangibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTags(sub.id)}
                        className="h-6 text-xs"
                      >
                        {t('editTags')}
                      </TangibleButton>
                    </div>
                  )}
                  {editingTags === sub.id && (
                    <TangibleButton
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTags(null)}
                      className="mt-2 w-full"
                    >
                      {t('done')}
                    </TangibleButton>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">
                      ${sub.cost.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {sub.billingCycle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{t('nextBill')}: {new Date(sub.nextBillDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <TangibleButton variant="outline" size="sm" className="flex-1">
                    {t('edit')}
                  </TangibleButton>
                  <TangibleButton 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDeleteSubscription(sub.id, sub.name)}
                  >
                    {t('delete')}
                  </TangibleButton>
                </div>
              </TangibleCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredSubscriptions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-lg text-muted-foreground">{t('noSubscriptionsFound')}</p>
          <TangibleButton 
            className="mt-4"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            {t('addFirstSubscription')}
          </TangibleButton>
        </motion.div>
      )}

      <AddSubscriptionDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};
