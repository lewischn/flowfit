
import React, { useState, useEffect } from 'react';
import { Clock, Dumbbell, Calendar } from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import StudyTimer from './components/StudyTimer';
import WorkoutLog from './components/WorkoutLog';
import CalendarView from './components/CalendarView';

export default function FlowFit() {
  const [currentPage, setCurrentPage] = useState('study');
  const [studySessions, setStudySessions] = useState([]);
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      const sessionsData = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudySessions(sessionsData);

      const splitsSnapshot = await getDocs(collection(db, 'splits'));
      const splitsData = splitsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSplits(splitsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSession = async (session) => {
    try {
      const docRef = await addDoc(collection(db, 'sessions'), session);
      setStudySessions(prev => [...prev, { id: docRef.id, ...session }]);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  const addSplit = async (split) => {
    try {
      const docRef = await addDoc(collection(db, 'splits'), split);
      setSplits(prev => [...prev, { id: docRef.id, ...split }]);
    } catch (error) {
      console.error('Error adding split:', error);
    }
  };

  const deleteSplitFromDB = async (splitId) => {
    try {
      await deleteDoc(doc(db, 'splits', splitId));
      setSplits(prev => prev.filter(s => s.id !== splitId));
    } catch (error) {
      console.error('Error deleting split:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-indigo-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">FlowFit</h1>
            <p className="opacity-90">Balance your mind and body</p>
          </div>

          <div className="grid grid-cols-3 border-b">
            <button
              onClick={() => setCurrentPage('study')}
              className={`py-4 px-6 font-semibold flex items-center justify-center gap-2 transition ${
                currentPage === 'study'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock size={20} />
              Study Timer
            </button>
            <button
              onClick={() => setCurrentPage('workout')}
              className={`py-4 px-6 font-semibold flex items-center justify-center gap-2 transition ${
                currentPage === 'workout'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Dumbbell size={20} />
              Workout Log
            </button>
            <button
              onClick={() => setCurrentPage('calendar')}
              className={`py-4 px-6 font-semibold flex items-center justify-center gap-2 transition ${
                currentPage === 'calendar'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar size={20} />
              Calendar
            </button>
          </div>

          {currentPage === 'study' && (
            <StudyTimer studySessions={studySessions} addSession={addSession} />
          )}
          
          {currentPage === 'workout' && (
           <WorkoutLog
            studySessions={studySessions}
            addSession={addSession}
            splits={splits}
            addSplit={addSplit}
            deleteSplit={deleteSplitFromDB}
            reloadSplits={loadData} 
          />
          )}
          
          {currentPage === 'calendar' && (
            <CalendarView studySessions={studySessions} />
          )}
        </div>
      </div>
    </div>
  );
}