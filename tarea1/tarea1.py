import pandas as pd
from typing import List

def obtener_mes_valido(prompt):
    while True:
        try:
            mes = int(input(prompt))
            if 1 <= mes <= 6:
                return mes
            print("Mes inválido. Por favor, ingrese un número entre 1 y 6.")
        except ValueError:
            print("Por favor, ingrese un número válido.")

def promedio_crecimiento_red(df: pd.DataFrame, red: str, meses: List[str]) -> float:
    crecimiento = df[(df['RED SOCIAL'] == red) & (df['CONCEPTO'].str.contains('CRECIMIENTO'))].iloc[0]
    return sum(int(crecimiento[mes]) for mes in meses) / len(meses)

def promedio_me_gusta_red(df: pd.DataFrame, red: str, meses: List[str]) -> float:
    me_gusta = df[(df['RED SOCIAL'] == red) & (df['CONCEPTO'].str.contains('ME GUSTA'))].iloc[0]
    return sum(int(me_gusta[mes]) for mes in meses) / len(meses)

def main():
    df = pd.read_csv('datos_redes_sociales.csv')
    meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO']

    # Mostrar en pantalla la diferencia de seguidores(followers) en twitter entre el mes de enero y junio.
    seguidores = df[df['CONCEPTO'] == 'SEGUIDORES (FOLLOWERS)'].iloc[0]
    diferencia_seguidores_twitter = int(seguidores['JUNIO']) - int(seguidores['ENERO'])
    print(f"Diferencia de seguidores en Twitter entre Enero y Junio: {diferencia_seguidores_twitter}")

    # Permita calcular la diferencia de visualizaciones de youtube entre los meses seleccionados por teclado (enero a junio)
    mes_inicio = obtener_mes_valido("Ingrese el mes de inicio (1-6): ")
    mes_final = obtener_mes_valido("Ingrese el mes final (1-6): ")
    
    if mes_inicio <= mes_final:
        visualizaciones = df[df['CONCEPTO'] == 'VISUALIZACIONES'].iloc[0]
        diferencia_visualizaciones = int(visualizaciones[meses[mes_final - 1]]) - int(visualizaciones[meses[mes_inicio - 1]])
        print(f"Diferencia de visualizaciones en YouTube entre {meses[mes_inicio - 1]} y {meses[mes_final - 1]}: {diferencia_visualizaciones}")
    else:
        print("El mes final no puede ser menor que el mes de inicio.")

    # Calcular el promedio de crecimiento de twitter y facebook entre los meses de enero a junio
    for red in ['TWITTER', 'FACEBOOK']:
        promedio_crecimiento = promedio_crecimiento_red(df, red, meses)
        print(f"Promedio de crecimiento en {red}: {promedio_crecimiento:.2f}")

    # Calcular el promedio de “Me gusta” de Youtube, Twitter y Facebook
    for red in ['YOUTUBE', 'TWITTER', 'FACEBOOK']:
        promedio_me_gusta = promedio_me_gusta_red(df, red, meses)
        print(f"Promedio de ME GUSTA en {red}: {promedio_me_gusta:.2f}")

if __name__ == "__main__":
    main()
