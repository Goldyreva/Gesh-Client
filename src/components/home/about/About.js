import React, {forwardRef} from 'react';
import s from './About.module.sass';

const About = React.forwardRef((props, forwardRef) => {
    return (
        <div className={s.root} id={"about"} ref={forwardRef}>
            <div className={s.root__header}>
                <div className={s.root__h2_cont}><h2>О ПРОЕКТЕ</h2></div>
                <h4>Мы создаем сеть туристических деревень <br/>
                    на территориях с потенциалом для экотуризма.</h4>
            </div>
            <div className={s.root__cart_cont}>
                <div className={s.root__cart}>
                    <h5>СЕТЬ ТУРИСТИЧЕСКИХ <br/>
                        ГОСТЕВЫХ ДОМОВ</h5>
                    <p>Создание гостиничной инфраструктуры
                        по принципу time-share с возможностью
                        получать доход для инвесторов и путешествия внутри объектов сети.
                    </p>
                </div>
                <div className={s.root__cart}>
                    <h5>СОПУТСТВУЮЩИЕ <br/>
                        ТУРИСТИЧЕСКИЕ СЕРВИСЫ</h5>
                    <p>Вовлечение местных жителей и предпринимателей в сопутствующие сервисы: продажа сувениров, организации трансферов, экскурсий, сельское хозяйство, промыслы и др.</p>
                </div>
                <div className={s.root__cart}>
                    <h5>ОБЩЕСТВЕННАЯ <br/>
                        ИНФРАСТРУКТУРА</h5>
                    <p>Создание объектов с общественной функцией: сельская гостиная, коворкинг, визит-центр для досуга и общения.
                    </p>
                </div>
                <div className={s.root__cart}>
                    <h5>ТУРИСТИЧЕСКИЙ <br/>
                        АТТРАКТОР</h5>
                    <p>Развитие потенциала ближайших обьектов и организация бережного туризма для сохранения уникальных природных территорий.</p>
                </div>
            </div>
        </div>
    );
});

export default About;