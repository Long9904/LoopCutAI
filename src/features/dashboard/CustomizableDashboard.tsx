import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { TangibleButton } from '@/components/ui/tangible-button';
import { Settings, RotateCcw, Plus } from 'lucide-react';
import { DraggableWidget } from './DraggableWidget';
import { SpendingWidget } from './widgets/SpendingWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { UpcomingBillsWidget } from './widgets/UpcomingBillsWidget';
import { CategoryBreakdownWidget } from './widgets/CategoryBreakdownWidget';
import { QuickActionsWidget } from './widgets/QuickActionsWidget';
import { InsightsWidget } from './widgets/InsightsWidget';
import { SavingsWidget } from './widgets/SavingsWidget';
import { SubscriptionCountWidget } from './widgets/SubscriptionCountWidget';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Widget {
  id: string;
  component: React.ComponentType;
  name: string;
}

const allAvailableWidgets: Widget[] = [
  { id: 'spending', component: SpendingWidget, name: 'Monthly Spending' },
  { id: 'calendar', component: CalendarWidget, name: 'Calendar' },
  { id: 'upcoming', component: UpcomingBillsWidget, name: 'Upcoming Bills' },
  { id: 'breakdown', component: CategoryBreakdownWidget, name: 'Category Breakdown' },
  { id: 'actions', component: QuickActionsWidget, name: 'Quick Actions' },
  { id: 'insights', component: InsightsWidget, name: 'AI Insights' },
  { id: 'savings', component: SavingsWidget, name: 'Savings Goal' },
  { id: 'count', component: SubscriptionCountWidget, name: 'Subscription Count' },
];

const defaultWidgets: Widget[] = allAvailableWidgets.slice(0, 6);

export const CustomizableDashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);

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
      toast.success('Widget position updated');
    }
  };

  const handleReset = () => {
    setWidgets(defaultWidgets);
    setIsEditMode(false);
    toast.success('Dashboard reset to default layout');
  };

  const handleAddWidget = (widgetId: string) => {
    const widgetToAdd = allAvailableWidgets.find((w) => w.id === widgetId);
    if (widgetToAdd && !widgets.find((w) => w.id === widgetId)) {
      setWidgets([...widgets, widgetToAdd]);
      toast.success(`Added ${widgetToAdd.name}`);
      setIsAddWidgetOpen(false);
    }
  };

  const availableToAdd = allAvailableWidgets.filter(
    (w) => !widgets.find((widget) => widget.id === w.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          {isEditMode ? '🎨 Drag & drop widgets to customize' : 'Your subscription overview'}
        </p>
        <div className="flex gap-2">
          <Dialog open={isAddWidgetOpen} onOpenChange={setIsAddWidgetOpen}>
            <DialogTrigger asChild>
              <TangibleButton variant="outline">
                <Plus className="h-4 w-4" />
                Add Widget
              </TangibleButton>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>Add Widget</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                {availableToAdd.map((widget) => (
                  <TangibleButton
                    key={widget.id}
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleAddWidget(widget.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {widget.name}
                  </TangibleButton>
                ))}
                {availableToAdd.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    All widgets are already added
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
          {isEditMode && (
            <TangibleButton variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
              Reset Layout
            </TangibleButton>
          )}
          <TangibleButton
            variant={isEditMode ? 'default' : 'secondary'}
            onClick={() => {
              setIsEditMode(!isEditMode);
              toast.info(isEditMode ? 'Edit mode disabled' : 'Edit mode enabled - drag widgets to reorder');
            }}
          >
            <Settings className="h-4 w-4" />
            {isEditMode ? 'Done' : 'Customize'}
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
