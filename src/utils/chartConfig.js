import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

// Global chart defaults for better sizing
ChartJS.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
ChartJS.defaults.font.size = 12;
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

// Reduce default padding
ChartJS.defaults.plugins.legend.labels.padding = 12;
ChartJS.defaults.plugins.legend.labels.boxWidth = 12;
ChartJS.defaults.plugins.legend.labels.boxHeight = 12;
