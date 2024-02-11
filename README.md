# Dating-App
Kurs: Affective Computing
Mitglieder: Peiwen Du, Alexander Richter, Henrike Schuster, Sikuan Yan

## Inhaltsverzeichnis:
1. [Was ist die Aufgabe des Projekts?](#was-ist-die-aufgabe-des-projekts)
2. [Welche Technologien werden verwendet?](#welche-technologien-werden-verwendet)
3. [Wie führe ich das Programm aus?](#wie-fuehre-ich-das-programm-aus)
4. [Was für Dependencies werden verwendet?](#installation)

---

### Aufgabe des Projekts
Die Motivation hinter diesem Projekt liegt in der Schaffung eines innovativen Ansatzes für Online-Dating, der sich auf visuelle Reize und emotionale Resonanz konzentriert. Traditionelle Dating-Plattformen sind oft textbasiert, was zu Informationsüberlastung und einer weniger authentischen Erfahrung führen kann. Durch die Verwendung von Profilbildern ohne begleitenden Text wird der Fokus auf den ersten Eindruck und die visuelle Anziehungskraft gelegt, was eine natürlichere und spontanere Verbindung ermöglicht.

### Verwendete Technologien
Die Haupttechnologien und Bibliotheken, die im Projekt verwendet werden, sind:

- **JavaScript**: Die primäre Programmiersprache für die Implementierung der Anwendungslogik.
- **HTML/CSS**: Für die Darstellung und Gestaltung der Benutzeroberfläche.
- **WebGazer.js**: Eine JavaScript-Bibliothek für das Eyetracking.
- **FaceAPI.js**: Eine JavaScript-Bibliothek für die Gesichts- und Emotionserkennung.
- **Node.js und Express.js**: Node.js wird für die serverseitige Logik verwendet, um einen einfachen HTTP-Server zu erstellen und Daten zwischen dem Server und dem Client auszutauschen. Express.js ist ein Framework für Node.js, das zur Erstellung von Webanwendungen und APIs verwendet wird. In diesem Projekt wird Express.js verwendet, um Routen zu definieren und den HTTP-Server zu konfigurieren.
- **Bootstrap**: Ein Open-Source-Framework für das Frontend-Design von Websites und Webanwendungen. Es wird verwendet, um das Erscheinungsbild und das Layout der Benutzeroberfläche zu gestalten und zu verbessern.
- **TensorFlow.js**: Eine JavaScript-Bibliothek für maschinelles Lernen und Deep Learning, die es ermöglicht, Modelle direkt im Browser auszuführen. In diesem Projekt wird TensorFlow.js verwendet, um Gesichter in Bildern zu erkennen und emotionale Ausdrücke zu identifizieren.
- **SweetAlert**: Eine JavaScript-Bibliothek, die die Benutzerinteraktion verbessert, indem sie benutzerdefinierte und attraktiv gestaltete Modalfenster und Benachrichtigungen anzeigt. In diesem Projekt wird SweetAlert verwendet, um interaktive Benachrichtigungen und Popup-Dialoge anzuzeigen.

### Installation und Ausführung
Um den Code auszuführen, müssen folgende Schritte durchgeführt werden:

1. **Node.js Installation**: Stellen Sie sicher, dass Node.js auf Ihrem System installiert ist.

2. **Abhängigkeiten installieren**: Navigieren Sie in das Hauptverzeichnis des Projekts und führen Sie den Befehl `npm install` aus, um alle erforderlichen Abhängigkeiten zu installieren. 

3. **Starten des Servers**: Führen Sie den Befehl `node server.js` aus, um den Server zu starten.

4. **Öffnen der Anwendung**: Öffnen Sie einen Webbrowser und geben Sie `http://localhost:3000` in die Adressleiste ein, um auf die Anwendung zuzugreifen. Stellen Sie sicher, dass Ihr Computer übereine Webcam verfügt und Ihr Browser auf diese zugreifen kann.

5. **Interaktion mit der Anwendung**: Folgen Sie den Anweisungen auf der Anwendungsseite und beginnen Sie das Dating-Erlebnis.

### Dependencies
Die benötigten Abhängigkeiten sind:

```json
{
  "dependencies": {
    "@mapbox/node-pre-gyp": "^1.0.11",
    "@tensorflow/tfjs-core": "^4.15.0",
    "@vladmandic/face-api": "^1.7.12",
    "bootstrap": "^5.3.2",
    "express": "^4.18.2",
    "face-api.js": "^0.20.0",
    "node-fetch": "^3.3.2",
    "sweetalert": "^2.1.2",
    "tfjs-image-recognition-base": "^0.6.0"
  }
}