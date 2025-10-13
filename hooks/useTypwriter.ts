import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 30) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        // Bu efekt, yazdırılacak ana metin (`text`) değiştiğinde çalışır.
        // Tek görevi, daktilo efektini en baştan başlatmak için `displayedText`'i sıfırlamaktır.
        setDisplayedText('');
    }, [text]);

    useEffect(() => {
        // Bu ikinci efekt, gösterilen metin (`displayedText`) her değiştiğinde çalışır.
        // Görevi, bir sonraki harfin ne zaman ekleneceğini planlamaktır.

        // Eğer tüm metin zaten gösterilmişse, yeni bir zamanlayıcı kurma.
        if (displayedText.length === text.length) {
            return;
        }

        // 'speed' milisaniye sonra, bir sonraki harfi ekleyecek olan zamanlayıcıyı kur.
        const timeoutId = setTimeout(() => {
            setDisplayedText(text.substring(0, displayedText.length + 1));
        }, speed);

        // Temizlik fonksiyonu: Eğer bu efekt yeniden çalışırsa (çünkü yeni bir harf eklendi)
        // veya bileşen kaldırılırsa, bir önceki zamanlayıcıyı iptal et.
        // Bu, binlerce zamanlayıcının aynı anda çalışmasını engeller.
        return () => clearTimeout(timeoutId);

    }, [displayedText, text, speed]); // Bu efekt, her yeni harf eklendiğinde yeniden tetiklenir.

    return displayedText;
};