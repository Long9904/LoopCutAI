import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { TangibleButton } from '@/components/ui/tangible-button';
import { Settings, RotateCcw } from 'lucide-react';
import { DraggableWidget } from './DraggableWidget';
import { SpendingWidget } from './widgets/SpendingWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { UpcomingBillsWidget } from './widgets/UpcomingBillsWidget';
import { CategoryBreakdownWidget } from './widgets/CategoryBreakdownWidget';
import { QuickActionsWidget } from './widgets/QuickActionsWidget';
import { InsightsWidget } from './widgets/InsightsWidget';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface Widget {
  id: string;
  component: React.ComponentType;
}

const defaultWidgets: Widget[] = [
  { id: 'spending', component: SpendingWidget },
  { id: 'calendar', component: CalendarWidget },
  { id: 'upcoming', component: UpcomingBillsWidget },
  { id: 'breakdown', component: CategoryBreakdownWidget },
  { id: 'actions', component: QuickActionsWidget },
  { id: 'insights', component: InsightsWidget },
];

export const CustomizableDashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useLanguage();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success(t('widgetPositionUpdated'));
    }
  };

  const handleReset = () => {
    setWidgets(defaultWidgets);
    setIsEditMode(false);
    toast.success(t('dashboardResetSuccess'));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{t('dashboard')}</h1>
          <p className="mt-2 text-muted-foreground">
            {isEditMode ? t('dragDropCustomize') : t('yourSubscriptionOverview')}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditMode && (
            <TangibleButton variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
              {t('resetLayout')}
            </TangibleButton>
          )}
          <TangibleButton
            variant={isEditMode ? 'default' : 'secondary'}
            onClick={() => {
              setIsEditMode(!isEditMode);
              toast.info(isEditMode ? t('editModeDisabled') : t('editModeEnabled'));
            }}
          >
            <Settings className="h-4 w-4" />
            {isEditMode ? t('done') : t('customize')}
          </TangibleButton>
        </div>
      </motion.div>

      {/* Widgets Grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {widgets.map((widget, index) => (
              <DraggableWidget key={widget.id} id={widget.id} isEditMode={isEditMode} index={index}>
                <widget.component />
              </DraggableWidget>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
