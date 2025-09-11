// Smart City Assistant Application JavaScript

class SmartCityApp {
    constructor() {
        this.currentModule = 'dashboard';
        this.charts = {};
        this.data = {
            cityMetrics: {
                airQuality: {value: 50.7, status: "moderate", unit: "AQI"},
                energyConsumption: {value: 3217.9, status: "normal", unit: "MWh"},
                waterUsage: {value: 14896.0, status: "normal", unit: "Gallons"},
                trafficVolume: {value: 7934.0, status: "normal", unit: "Vehicles"},
                crimeIncidents: {value: 15.0, status: "normal", unit: "Incidents"},
                activeReports: {value: 162.0, status: "active", unit: "Reports"},
                environmentalAlerts: {value: 93.0, status: "monitor", unit: "Alerts"},
                activeAnomalies: {value: 58.0, status: "active", unit: "Anomalies"}
            },
            airQualityTrend: [
                {date: "2023-12-27", aqi: 49.0, pm25: 19.3, pm10: 31.3, co2: 426.8},
                {date: "2023-12-28", aqi: 43.5, pm25: 16.9, pm10: 30.8, co2: 418.6},
                {date: "2023-12-29", aqi: 41.9, pm25: 17.9, pm10: 23.8, co2: 411.2},
                {date: "2023-12-30", aqi: 48.0, pm25: 15.4, pm10: 23.6, co2: 415.6},
                {date: "2023-12-31", aqi: 50.7, pm25: 18.2, pm10: 28.4, co2: 422.3}
            ],
            energyTrend: [
                {date: "2023-12-27", consumption: 3264.3, renewable: 21.3, emissions: 1027.2},
                {date: "2023-12-28", consumption: 3256.2, renewable: 22.7, emissions: 1006.7},
                {date: "2023-12-29", consumption: 3202.8, renewable: 27.3, emissions: 931.6},
                {date: "2023-12-30", consumption: 3542.4, renewable: 27.0, emissions: 1035.0},
                {date: "2023-12-31", consumption: 3217.9, renewable: 28.5, emissions: 945.8}
            ],
            citizenFeedback: [
                {id: 1, category: "Parks & Recreation", priority: "Medium", status: "Under Review", date: "2023-07-28", satisfaction: 2},
                {id: 2, category: "Parks & Recreation", priority: "Low", status: "Resolved", date: "2023-02-07", satisfaction: 4},
                {id: 3, category: "Water Infrastructure", priority: "High", status: "In Progress", date: "2023-12-15", satisfaction: 3},
                {id: 4, category: "Traffic Management", priority: "Medium", status: "Resolved", date: "2023-11-22", satisfaction: 5}
            ],
            policyDocuments: [
                {id: 1, title: "Urban Sustainability Policy Framework 2024", type: "Environmental Policy", date: "2024-01-15", status: "Active"},
                {id: 2, title: "Smart Traffic Management Regulation", type: "Transportation Policy", date: "2023-11-08", status: "Active"},
                {id: 3, title: "Digital Governance and Citizen Engagement Policy", type: "Governance Policy", date: "2024-03-22", status: "Draft"}
            ],
            ecoAdvice: [
                {category: "Energy Conservation", recommendation: "Switch to LED lighting in public buildings", impact: "High", cost: "Medium", timeline: "6 months"},
                {category: "Water Management", recommendation: "Implement smart water meters", impact: "High", cost: "High", timeline: "12 months"},
                {category: "Transportation", recommendation: "Expand bike lane network", impact: "Medium", cost: "Medium", timeline: "18 months"},
                {category: "Energy Conservation", recommendation: "Install solar panels on government buildings", impact: "High", cost: "High", timeline: "24 months"},
                {category: "Waste Management", recommendation: "Implement smart waste bins with sensors", impact: "Medium", cost: "Medium", timeline: "8 months"}
            ],
            anomalies: [
                {id: 1, type: "Traffic Congestion Spike", severity: "Medium", status: "Investigating", location: "Sector 3-C", timestamp: "2023-12-31 14:30:00"},
                {id: 2, type: "Water Pressure Drop", severity: "High", status: "Resolved", location: "Sector 8-D", timestamp: "2023-12-31 09:15:00"},
                {id: 3, type: "Air Quality Alert", severity: "Low", status: "Monitoring", location: "Sector 6-B", timestamp: "2023-12-31 16:45:00"}
            ],
            forecastData: {
                waterUsage: [
                    {month: "Jan 2024", predicted: 14500, actual: 14200, confidence: 0.89},
                    {month: "Feb 2024", predicted: 13800, actual: 13950, confidence: 0.91},
                    {month: "Mar 2024", predicted: 15200, actual: null, confidence: 0.87}
                ],
                energyConsumption: [
                    {month: "Jan 2024", predicted: 3100, actual: 3050, confidence: 0.92},
                    {month: "Feb 2024", predicted: 2950, actual: 3000, confidence: 0.94},
                    {month: "Mar 2024", predicted: 3250, actual: null, confidence: 0.88}
                ]
            }
        };

        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupModals();
        this.setupChat();
        this.setupFileUploads();
        this.updateCurrentTime();
        this.populateInitialData();
        this.initializeCharts();
        this.startRealTimeUpdates();
    }

    setupNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const module = item.getAttribute('data-module');
                console.log('Switching to module:', module); // Debug log
                this.switchModule(module);
            });
        });
    }

    switchModule(moduleName) {
        console.log('switchModule called with:', moduleName); // Debug log
        
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeMenuItem = document.querySelector(`[data-module="${moduleName}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }

        // Hide all modules
        document.querySelectorAll('.module').forEach(module => {
            module.classList.remove('active');
            console.log('Hiding module:', module.id); // Debug log
        });

        // Show selected module
        const targetModule = document.getElementById(`${moduleName}-module`);
        console.log('Target module:', targetModule); // Debug log
        
        if (targetModule) {
            targetModule.classList.add('active');
            console.log('Showing module:', targetModule.id); // Debug log
        } else {
            console.error('Module not found:', `${moduleName}-module`);
        }
        
        // Update page title
        const titles = {
            'dashboard': 'City Dashboard',
            'health': 'City Health Dashboard',
            'feedback': 'Citizen Feedback System',
            'documents': 'Document Summarization',
            'eco-advice': 'Eco-Advice Module',
            'anomaly': 'Anomaly Detection',
            'forecasting': 'KPI Forecasting',
            'chat': 'AI Assistant'
        };
        
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = titles[moduleName] || 'Smart City Dashboard';
        }
        
        this.currentModule = moduleName;
        
        // Load module-specific data with a small delay to ensure DOM is ready
        setTimeout(() => {
            this.loadModuleData(moduleName);
        }, 100);
    }

    loadModuleData(moduleName) {
        console.log('Loading data for module:', moduleName); // Debug log
        
        switch(moduleName) {
            case 'dashboard':
                this.initAirQualityChart();
                break;
            case 'health':
                this.initEnvironmentalChart();
                break;
            case 'feedback':
                this.populateFeedbackTable();
                break;
            case 'documents':
                this.populateDocumentsList();
                break;
            case 'eco-advice':
                this.populateEcoAdvice();
                break;
            case 'anomaly':
                this.populateAnomalies();
                break;
            case 'forecasting':
                this.initForecastCharts();
                break;
            case 'chat':
                // Chat is already initialized
                break;
        }
    }

    setupModals() {
        // Feedback modal
        const feedbackModal = document.getElementById('feedback-modal');
        const newFeedbackBtn = document.getElementById('new-feedback-btn');
        const closeFeedbackModal = document.getElementById('close-feedback-modal');
        const cancelFeedback = document.getElementById('cancel-feedback');
        const feedbackForm = document.getElementById('feedback-form');

        if (newFeedbackBtn && feedbackModal) {
            newFeedbackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Opening feedback modal'); // Debug log
                feedbackModal.classList.remove('hidden');
            });
        }

        [closeFeedbackModal, cancelFeedback].forEach(btn => {
            if (btn && feedbackModal) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    feedbackModal.classList.add('hidden');
                    if (feedbackForm) feedbackForm.reset();
                });
            }
        });

        if (feedbackForm) {
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitFeedback();
            });
        }

        // Close modal when clicking outside
        if (feedbackModal) {
            feedbackModal.addEventListener('click', (e) => {
                if (e.target === feedbackModal) {
                    feedbackModal.classList.add('hidden');
                }
            });
        }
    }

    setupChat() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const quickBtns = document.querySelectorAll('.quick-btn');

        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', () => {
                const message = chatInput.value.trim();
                if (message) {
                    this.sendChatMessage(message);
                    chatInput.value = '';
                }
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const message = chatInput.value.trim();
                    if (message) {
                        this.sendChatMessage(message);
                        chatInput.value = '';
                    }
                }
            });
        }

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                if (message) {
                    this.sendChatMessage(message);
                }
            });
        });
    }

    setupFileUploads() {
        // Document upload
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const browseBtn = document.getElementById('browse-btn');

        if (browseBtn && fileInput) {
            browseBtn.addEventListener('click', () => fileInput.click());
        }
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleDocumentUpload(file);
                }
            });
        }

        // CSV upload for forecasting
        const csvUploadArea = document.getElementById('forecast-upload-area');
        const csvInput = document.getElementById('csv-input');
        const csvBrowseBtn = document.getElementById('csv-browse-btn');

        if (csvBrowseBtn && csvInput) {
            csvBrowseBtn.addEventListener('click', () => csvInput.click());
        }
        
        if (csvUploadArea && csvInput) {
            csvUploadArea.addEventListener('click', () => csvInput.click());
        }

        if (csvInput) {
            csvInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleCSVUpload(file);
                }
            });
        }

        // Eco advice category filtering
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-category');
                this.filterEcoAdvice(category);
            });
        });
    }

    updateCurrentTime() {
        const timeElement = document.getElementById('current-time');
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        if (timeElement) {
            timeElement.textContent = timeString;
        }
        
        // Update every minute
        setTimeout(() => this.updateCurrentTime(), 60000);
    }

    populateInitialData() {
        this.populateAlerts();
        this.populateFeedbackTable();
        this.populateDocumentsList();
        this.populateEcoAdvice();
        this.populateAnomalies();
    }

    populateAlerts() {
        const alertList = document.getElementById('alert-list');
        if (!alertList) return;

        const alerts = [
            {
                type: 'Air Quality Warning',
                message: 'PM2.5 levels elevated in Sector 6-B',
                time: '15 min ago',
                severity: 'warning'
            },
            {
                type: 'Traffic Congestion',
                message: 'Heavy traffic detected on Main Street',
                time: '32 min ago',
                severity: 'info'
            },
            {
                type: 'Water Pressure Drop',
                message: 'Water pressure below normal in Sector 8-D',
                time: '1 hour ago',
                severity: 'error'
            }
        ];

        alertList.innerHTML = alerts.map(alert => `
            <div class="alert-item">
                <div class="alert-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="alert-content">
                    <h5>${alert.type}</h5>
                    <p>${alert.message}</p>
                </div>
                <div class="alert-time">${alert.time}</div>
            </div>
        `).join('');
    }

    populateFeedbackTable() {
        const tbody = document.querySelector('#feedback-table tbody');
        if (!tbody) return;

        tbody.innerHTML = this.data.citizenFeedback.map(feedback => `
            <tr>
                <td>#${feedback.id}</td>
                <td>${feedback.category}</td>
                <td><span class="status status--${this.getPriorityClass(feedback.priority)}">${feedback.priority}</span></td>
                <td><span class="status status--${this.getStatusClass(feedback.status)}">${feedback.status}</span></td>
                <td>${new Date(feedback.date).toLocaleDateString()}</td>
                <td>${'★'.repeat(feedback.satisfaction)}${'☆'.repeat(5-feedback.satisfaction)}</td>
            </tr>
        `).join('');
    }

    populateDocumentsList() {
        const documentsList = document.getElementById('documents-list');
        if (!documentsList) return;

        documentsList.innerHTML = this.data.policyDocuments.map(doc => `
            <div class="document-item">
                <div class="document-info">
                    <h4>${doc.title}</h4>
                    <div class="document-meta">
                        ${doc.type} • ${new Date(doc.date).toLocaleDateString()} • 
                        <span class="status status--${doc.status === 'Active' ? 'success' : 'warning'}">${doc.status}</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="btn btn--outline btn--sm" onclick="app.summarizeDocument(${doc.id})">
                        <i class="fas fa-file-alt"></i> Summarize
                    </button>
                </div>
            </div>
        `).join('');
    }

    populateEcoAdvice(filter = 'all') {
        const adviceGrid = document.getElementById('advice-grid');
        if (!adviceGrid) return;

        let filteredAdvice = this.data.ecoAdvice;
        if (filter !== 'all') {
            filteredAdvice = this.data.ecoAdvice.filter(advice => 
                advice.category.toLowerCase().includes(filter.toLowerCase())
            );
        }

        adviceGrid.innerHTML = filteredAdvice.map(advice => `
            <div class="advice-card">
                <h4>${advice.category}</h4>
                <p>${advice.recommendation}</p>
                <div class="advice-meta">
                    <span><i class="fas fa-chart-line"></i> Impact: ${advice.impact}</span>
                    <span><i class="fas fa-dollar-sign"></i> Cost: ${advice.cost}</span>
                    <span><i class="fas fa-clock"></i> ${advice.timeline}</span>
                </div>
                <button class="btn btn--primary btn--sm" style="margin-top: 12px;">
                    <i class="fas fa-check"></i> Implement
                </button>
            </div>
        `).join('');
    }

    populateAnomalies() {
        const anomalyList = document.getElementById('anomaly-list');
        if (!anomalyList) return;

        anomalyList.innerHTML = this.data.anomalies.map(anomaly => `
            <div class="anomaly-item">
                <div class="anomaly-info">
                    <h4>${anomaly.type}</h4>
                    <div class="anomaly-details">
                        ${anomaly.location} • ${new Date(anomaly.timestamp).toLocaleString()}
                    </div>
                </div>
                <div class="anomaly-actions">
                    <span class="status status--${this.getSeverityClass(anomaly.severity)}">${anomaly.severity}</span>
                    <span class="status status--${this.getStatusClass(anomaly.status)}">${anomaly.status}</span>
                </div>
            </div>
        `).join('');
    }

    initializeCharts() {
        // Initialize dashboard chart immediately
        setTimeout(() => {
            this.initAirQualityChart();
        }, 100);
    }

    initAirQualityChart() {
        const ctx = document.getElementById('airQualityChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.charts.airQuality) {
            this.charts.airQuality.destroy();
        }

        const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'];

        this.charts.airQuality = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.airQualityTrend.map(item => new Date(item.date).toLocaleDateString()),
                datasets: [
                    {
                        label: 'AQI',
                        data: this.data.airQualityTrend.map(item => item.aqi),
                        borderColor: chartColors[0],
                        backgroundColor: chartColors[0] + '20',
                        tension: 0.4
                    },
                    {
                        label: 'PM2.5',
                        data: this.data.airQualityTrend.map(item => item.pm25),
                        borderColor: chartColors[1],
                        backgroundColor: chartColors[1] + '20',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    initEnvironmentalChart() {
        const ctx = document.getElementById('environmentalChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.charts.environmental) {
            this.charts.environmental.destroy();
        }

        const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'];

        this.charts.environmental = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.airQualityTrend.map(item => new Date(item.date).toLocaleDateString()),
                datasets: [
                    {
                        label: 'PM2.5 (μg/m³)',
                        data: this.data.airQualityTrend.map(item => item.pm25),
                        backgroundColor: chartColors[0]
                    },
                    {
                        label: 'PM10 (μg/m³)',
                        data: this.data.airQualityTrend.map(item => item.pm10),
                        backgroundColor: chartColors[1]
                    },
                    {
                        label: 'CO2 (ppm/10)',
                        data: this.data.airQualityTrend.map(item => item.co2 / 10), // Scale down for visibility
                        backgroundColor: chartColors[2]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    initForecastCharts() {
        this.initWaterForecastChart();
        this.initEnergyForecastChart();
    }

    initWaterForecastChart() {
        const ctx = document.getElementById('waterForecastChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.charts.waterForecast) {
            this.charts.waterForecast.destroy();
        }

        const chartColors = ['#1FB8CD', '#FFC185'];

        this.charts.waterForecast = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.forecastData.waterUsage.map(item => item.month),
                datasets: [
                    {
                        label: 'Predicted Usage',
                        data: this.data.forecastData.waterUsage.map(item => item.predicted),
                        borderColor: chartColors[0],
                        backgroundColor: chartColors[0] + '20',
                        tension: 0.4
                    },
                    {
                        label: 'Actual Usage',
                        data: this.data.forecastData.waterUsage.map(item => item.actual),
                        borderColor: chartColors[1],
                        backgroundColor: chartColors[1] + '20',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    initEnergyForecastChart() {
        const ctx = document.getElementById('energyForecastChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.charts.energyForecast) {
            this.charts.energyForecast.destroy();
        }

        const chartColors = ['#1FB8CD', '#FFC185'];

        this.charts.energyForecast = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.forecastData.energyConsumption.map(item => item.month),
                datasets: [
                    {
                        label: 'Predicted Consumption',
                        data: this.data.forecastData.energyConsumption.map(item => item.predicted),
                        borderColor: chartColors[0],
                        backgroundColor: chartColors[0] + '20',
                        tension: 0.4
                    },
                    {
                        label: 'Actual Consumption',
                        data: this.data.forecastData.energyConsumption.map(item => item.actual),
                        borderColor: chartColors[1],
                        backgroundColor: chartColors[1] + '20',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    sendChatMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">${message}</div>
            <div class="message-time">Now</div>
        `;
        chatMessages.appendChild(userMessage);

        // Simulate AI response
        setTimeout(() => {
            const botResponse = this.generateAIResponse(message);
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">${botResponse}</div>
                <div class="message-time">Now</div>
            `;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(message) {
        const responses = {
            'air quality': `Current air quality index is ${this.data.cityMetrics.airQuality.value} AQI (Moderate level). PM2.5 levels are at 18.2 μg/m³. The main contributors are vehicle emissions and industrial activity. I recommend avoiding outdoor activities during peak hours.`,
            'feedback': `There are currently ${this.data.cityMetrics.activeReports.value} active citizen reports. Most recent feedback includes issues with Parks & Recreation and Water Infrastructure. Response time averages 2.5 days for high-priority issues.`,
            'anomalies': `${this.data.cityMetrics.activeAnomalies.value} anomalies are currently being monitored. Recent alerts include traffic congestion spikes and water pressure variations. Our system maintains 94% accuracy in anomaly detection.`,
            'energy': `Current energy consumption is ${this.data.cityMetrics.energyConsumption.value} MWh. Renewable energy accounts for 28.5% of total consumption. Peak usage typically occurs between 6-9 PM.`,
            'water': `Water usage stands at ${this.data.cityMetrics.waterUsage.value} gallons today. All quality parameters are within acceptable ranges. Smart meters are being deployed across 15 districts.`
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return "I can help you with information about air quality, energy consumption, water usage, citizen feedback, anomaly detection, and policy documents. What specific information would you like to know about?";
    }

    submitFeedback() {
        const category = document.getElementById('feedback-category').value;
        const priority = document.getElementById('feedback-priority').value;
        const description = document.getElementById('feedback-description').value;
        const location = document.getElementById('feedback-location').value;

        // Simulate submission
        const newFeedback = {
            id: this.data.citizenFeedback.length + 1,
            category: category,
            priority: priority,
            status: 'Under Review',
            date: new Date().toISOString().split('T')[0],
            satisfaction: 0,
            description: description,
            location: location
        };

        this.data.citizenFeedback.unshift(newFeedback);
        this.populateFeedbackTable();

        // Close modal and show success
        document.getElementById('feedback-modal').classList.add('hidden');
        document.getElementById('feedback-form').reset();
        
        // Show success message
        alert('Feedback submitted successfully! Tracking ID: #' + newFeedback.id);
    }

    handleDocumentUpload(file) {
        // Simulate document processing
        const uploadArea = document.getElementById('upload-area');
        if (!uploadArea) return;
        
        uploadArea.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <p>Processing ${file.name}...</p>
        `;

        setTimeout(() => {
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: var(--color-success);"></i>
                <p>Document processed successfully!</p>
                <div class="summary-preview" style="margin-top: 16px; padding: 16px; background: var(--color-bg-3); border-radius: 8px; text-align: left;">
                    <h4>AI Summary</h4>
                    <p>This document outlines new sustainability initiatives focusing on renewable energy adoption, waste reduction, and smart infrastructure implementation. Key objectives include 40% reduction in carbon emissions by 2025.</p>
                </div>
                <button class="btn btn--outline" style="margin-top: 12px;" onclick="app.resetDocumentUpload()">Upload Another</button>
            `;
        }, 2000);
    }

    handleCSVUpload(file) {
        // Simulate CSV processing
        const uploadArea = document.getElementById('forecast-upload-area');
        if (!uploadArea) return;
        
        uploadArea.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <p>Processing ${file.name}...</p>
        `;

        setTimeout(() => {
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: var(--color-success);"></i>
                <p>CSV data processed successfully!</p>
                <p style="margin-top: 8px; font-size: 14px; color: var(--color-text-secondary);">
                    Processed 1,247 records. Forecast accuracy: 91.2%
                </p>
                <button class="btn btn--outline" style="margin-top: 12px;" onclick="app.resetCSVUpload()">Upload Another</button>
            `;
        }, 1500);
    }

    resetDocumentUpload() {
        const uploadArea = document.getElementById('upload-area');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drop your document here or click to browse</p>
                <input type="file" id="file-input" accept=".pdf,.doc,.docx" hidden>
                <button class="btn btn--outline" id="browse-btn">Browse Files</button>
            `;
            this.setupFileUploads();
        }
    }

    resetCSVUpload() {
        const uploadArea = document.getElementById('forecast-upload-area');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-file-csv"></i>
                <p>Upload CSV data for predictive analysis</p>
                <input type="file" id="csv-input" accept=".csv" hidden>
                <button class="btn btn--outline" id="csv-browse-btn">Browse CSV Files</button>
            `;
            this.setupFileUploads();
        }
    }

    filterEcoAdvice(category) {
        this.populateEcoAdvice(category);
    }

    summarizeDocument(docId) {
        const summaries = {
            1: "This comprehensive framework establishes guidelines for urban sustainability, emphasizing renewable energy adoption, green building standards, and circular economy principles. Key targets include 50% renewable energy by 2025 and 30% reduction in urban waste.",
            2: "The regulation introduces AI-powered traffic management systems, dynamic signal optimization, and integrated public transport coordination. Expected outcomes include 25% reduction in congestion and 15% improvement in air quality.",
            3: "This policy framework promotes digital citizen engagement through online platforms, AI-powered service delivery, and transparent governance mechanisms. Focus areas include digital identity, e-services, and participatory decision-making."
        };

        alert(`Document Summary:\n\n${summaries[docId] || "Summary will be generated by AI analysis of the document content, highlighting key policies, objectives, and implementation timelines."}`);
    }

    startRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateMetrics();
        }, 30000); // Update every 30 seconds
    }

    updateMetrics() {
        // Simulate slight variations in metrics
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            const currentValue = parseFloat(metric.textContent.replace(/,/g, ''));
            if (!isNaN(currentValue)) {
                const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
                const newValue = currentValue * (1 + variation);
                const unit = metric.querySelector('span')?.textContent || '';
                metric.innerHTML = `${this.formatNumber(newValue)} <span>${unit}</span>`;
            }
        });
    }

    formatNumber(num) {
        if (num >= 1000) {
            return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
        return num.toFixed(1);
    }

    getPriorityClass(priority) {
        const classes = {
            'Low': 'info',
            'Medium': 'warning',
            'High': 'error',
            'Critical': 'error'
        };
        return classes[priority] || 'info';
    }

    getStatusClass(status) {
        const classes = {
            'Resolved': 'success',
            'In Progress': 'warning',
            'Under Review': 'info',
            'Investigating': 'warning',
            'Monitoring': 'info'
        };
        return classes[status] || 'info';
    }

    getSeverityClass(severity) {
        const classes = {
            'Low': 'info',
            'Medium': 'warning',
            'High': 'error',
            'Critical': 'error'
        };
        return classes[severity] || 'info';
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SmartCityApp();
});